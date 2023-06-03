import request from '../utils/request'


export function getList() {
    return request({
        url: 'admin/products',
        method: 'GET'
    })
}


export function add(data) {
    return request({
        url: 'admin/products/store',
        method: 'POST',
        data
    })
}

export function update(data) {
    return request({
        url: `admin/products/update/${data.id}`,
        method: 'POST',
        data
    })    
}

export function destroy(id) {
    return request({
        url: `admin/products/delete/${id}`,
        method: 'DELETE'
    })
}