<template>
  <div style="padding: 10px">
    <Header />
    <div class="header">
      <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <h2 style="margin: 0px">Categories</h2>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <el-button style="float: right" type="primary" @click="handleAdd"
            >Add</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="tabel-body">
      <el-card>
        <el-table :data="tabelData.list" style="width: 100%">
          <el-table-column prop="name" label="Name" width="1170" />
          <el-table-column fixed="right" label="Operations">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
                >Edit</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                @click="handleDelete(scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <div class="dialog">
      <el-dialog
        v-model="dialogFormVisible"
        :title="dialogTitle"
        append-to-body
      >
        <el-form :model="form">
          <el-form-item label="Category Name" :label-width="formLabelWidth">
            <el-input v-model="formData.name" autocomplete="off" />
            <span v-if="isError" style="color:red">Required</span>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleDialogClose">Cancel</el-button>
            <el-button type="primary" @click="handleFormSubmit">
              Save
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

  </div>
</template>



<script setup>
import { ref, reactive, onMounted } from "vue";
import { getList, add, update, destroy } from '../../api/categories'
import Header from '../../layout/Header.vue'

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
let dialogTitle = ref("");
let isError = ref(false)
const formData = reactive({
  id: "",
  name: "",
});

var tabelData = reactive({
  list: [{}]
});

// open dialog add
function handleAdd() {
  formData.name = "";
  dialogFormVisible.value = true;
  dialogTitle.value = "Add New Category";
}

// open dilog edit
function handleEdit(data) {
  formData.name = data.name;
  formData.id = data.id;
  dialogFormVisible.value = true;
  dialogTitle.value = "Edit Category";
}

// handel form data
async function handleFormSubmit() {
  if(!formData.name) {
    isError.value = true;
    dialogFormVisible.value = true;
  } else {
    isError.value = false;
    if (dialogTitle.value === "Edit Category") {
      handleUpdateFormData(formData)
    } else {
      handleAddFormData(formData)
    }

  }
}

// handel add 
function handleAddFormData(data) {
  delete data.id;
  add(data).then(() => {
    getCategorieList()
    dialogFormVisible.value = false;
  })
  .catch(err => console.log(err))
}

// handel update
function handleUpdateFormData(data) {
  update(data).then(() => {
    getCategorieList()
    dialogFormVisible.value = false;
  })
  .catch(err => console.log(err))
}

// handel delete
async function handleDelete(data) {
  destroy(data.id).then(() => {
    getCategorieList();
  })
}

// close dialog
function handleDialogClose() {
  dialogFormVisible.value = false;
}

// get list data 
function getCategorieList() {
  getList().then((res) => {
    tabelData.list = res.data.data
  })
  .catch((err) => {
    console.log('err',err)
  })
}

onMounted(() => {
  getCategorieList();
});
</script>


<style scoped>
.header {
  padding-top: 10px;
}
.tabel-body {
  margin-top: 10px;
}
</style>
