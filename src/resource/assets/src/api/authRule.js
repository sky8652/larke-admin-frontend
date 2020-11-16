import request from '@/utils/request'

export function getRuleList(params) {
  return request({
    url: '/auth/rule',
    method: 'get',
    params
  })
}

export function getRuleTreeList(params) {
  return request({
    url: '/auth/rule/tree',
    method: 'get',
    params
  })
}

export function getRuleChildrenList(params) {
  return request({
    url: '/auth/rule/children',
    method: 'get',
    params
  })
}

export function getRuleDetail(id) {
  return request({
    url: `/auth/rule/${id}`,
    method: 'get'
  })
}

export function createRule(data) {
  return request({
    url: '/auth/rule',
    method: 'post',
    data
  })
}

export function updateRule(id, data) {
  return request({
    url: `/auth/rule/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/auth/rule/${id}`,
    method: 'delete'
  })
}

export function updateRoleSort(id, data) {
  return request({
    url: `/auth/rule/${id}/sort`,
    method: 'patch',
    data
  })
}

export function enableRule(id) {
  return request({
    url: `/auth/rule/${id}/enable`,
    method: 'patch'
  })
}

export function disableRule(id) {
  return request({
    url: `/auth/rule/${id}/disable`,
    method: 'patch'
  })
}
