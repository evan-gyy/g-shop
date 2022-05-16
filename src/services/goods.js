import { request } from 'umi';

/**
 * 获取商品数据
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
 * 添加商品
 *
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function addGoods(params, options) {
  // console.log(params)
  return request('/api/admin/users', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

/**
 * 获取商品分类列表
 *
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function getCategory(params, options) {
  // console.log(params)
  return request('/api/admin/category', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
