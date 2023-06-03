<template>
  <div style="padding: 10px">
    <Header />
    <div class="header">
      <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <h2 style="margin: 0px">Products</h2>
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
          <el-form-item label="Category" :label-width="formLabelWidth">
            <el-select
              v-model="formData.categoryId"
              class="m-2"
              placeholder="Select"
            >
              <el-option
                v-for="item in categoryDropdownList.list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <span v-if="isError" style="color: red">Required</span>
          </el-form-item>
          <el-form-item label="Sub-Category" :label-width="formLabelWidth">
            <el-select
              v-model="formData.subCategoryId"
              class="m-2"
              placeholder="Select"
            >
              <el-option
                v-for="item in subCategoryDropdownList.list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <span v-if="isError" style="color: red">Required</span>
          </el-form-item>
          <el-form-item label="Product Name" :label-width="formLabelWidth">
            <el-input v-model="formData.name" autocomplete="off" />
            <span v-if="isError" style="color: red">Required</span>
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
import { getList, add, update, destroy } from "../../api/product";
import { getList as categoryDropDownList } from "../../api/categories";
import { getList as subCategoryDropDownList } from "../../api/sub-categories";
import Header from '../../layout/Header.vue'
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
let dialogTitle = ref("");
var tabelData = reactive({
  list: [{}],
});

let isError = ref(false);
const formData = reactive({
  id: "",
  categoryId: "",
  subCategoryId: "",
  name: "",
});

var categoryDropdownList = reactive({
  list: [{}],
});

var subCategoryDropdownList = reactive({
  list: [{}],
});

const value = ref("");

function handleAdd() {
  formData.name = "";
  formData.categoryId = "";
  formData.subCategoryId = "";
  dialogFormVisible.value = true;
  dialogTitle.value = "Add Product";
}

function handleEdit(data) {
  formData.name = data.name;
  formData.categoryId = data.categoryId;
  formData.subCategoryId = data.subCategoryId;
  formData.id = data.id;
  dialogFormVisible.value = true;
  dialogTitle.value = "Edit Product";
}

// handel form data
async function handleFormSubmit() {
  if (!formData.name || !formData.categoryId || !formData.subCategoryId) {
    isError.value = true;
    dialogFormVisible.value = true;
  } else {
    isError.value = false;
    if (dialogTitle.value === "Edit Product") {
      handleUpdateFormData(formData);
    } else {
      handleAddFormData(formData);
    }
  }
}

// handel add
function handleAddFormData(data) {
  delete data.id;
  add(data)
    .then(() => {
      getProductList();
      dialogFormVisible.value = false;
    })
    .catch((err) => console.log(err));
}

// handel update
function handleUpdateFormData(data) {
  update(data)
    .then(() => {
      getProductList();
      dialogFormVisible.value = false;
    })
    .catch((err) => console.log(err));
}

// handel delete
async function handleDelete(data) {
  destroy(data.id).then(() => {
    getProductList();
  });
}

function handleDialogClose() {
  dialogFormVisible.value = false;
}

function getProductList() {
  getList().then((response) => {
    tabelData.list = response.data.data;
  });
}

function getCategories() {
  categoryDropDownList().then((response) => {
    categoryDropdownList.list = response.data.data;
  });
}

function getSubCategories() {
  subCategoryDropDownList().then((response) => {
    subCategoryDropdownList.list = response.data.data;
  });
}

onMounted(() => {
  getProductList();
  getCategories();
  getSubCategories();
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
