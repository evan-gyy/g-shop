import { request } from 'umi';

/**
 * 获取用户数据
 *
 * @returns
 */
export async function getGoods(params, options) {
  // console.log(params)
  return request('/api/admin/goods', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/**
 * 添加用户
 *
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function addUser(params, options) {
  // console.log(params)
  return request('/api/admin/users', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}
