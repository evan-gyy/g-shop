import Mock from 'mockjs';

export default {
  'GET /api/admin/index': Mock.mock({
    'user|10-100': 50,
    'good|100-500': 200,
    'order|100-1000': 500,
  }),
};
