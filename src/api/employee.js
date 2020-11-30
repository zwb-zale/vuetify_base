import request from '@/utils/request'

export function getEmployees(params) {
  return request({
    url: '/kong/maxguide-fleetmng/v1.0/employees',
    method: 'get',
    params
  })
}

export function createEmployee(data) {
  return request({
    url: '/kong/maxguide-fleetmng/v1.0/employees',
    method: 'post',
    data
  })
}

export function updateEmployee(data) {
  const id = data.id
  delete data.id
  return request({
    url: `kong/maxguide-fleetmng/v1.0/employees/${id}`,
    method: 'put',
    data
  })
}

export function removeEmployee(id) {
  return request({
    url: `/kong/maxguide-fleetmng/v1.0/employees/${id}`,
    method: 'delete'
  })
}