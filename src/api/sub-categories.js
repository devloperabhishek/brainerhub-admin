import request from '../utils/request'


export function getList() {
    return request({
        url: 'admin/sub-categories',
        method: 'GET'
    })
}


export function add(data) {
    return request({
        url: 'admin/sub-categories/store',
        method: 'POST',
        data
    })
}

export function update(data) {
    return request({
        url: `admin/sub-categories/update/${data.id}`,
        method: 'POST',
        data
    })    
}

export function destroy(id) {
    return request({
        url: `admin/sub-categories/delete/${id}`,
        method: 'DELETE'
    })
}