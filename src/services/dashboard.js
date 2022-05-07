import { request } from 'umi';

/**
 * 获取面板数据
 * @returns 
 */
export async function fetchDashboard(params, options) {
  return request('/api/admin/index', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}