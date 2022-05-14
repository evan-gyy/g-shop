import Mock from 'mockjs';

export default {
  'GET /api/admin/goods': Mock.mock({
    'data|50-100': [
      {
        id: '@id',
        cover_url: '@email',
        title: '@ctitle',
        'price|20-100.2': 1,
        'stock|50-200': 1,
        'sales|0-100': 1,
        'is_on|1-2': true,
        'is_recommend|1-2': true,
        created_at: '@datetime',
      },
    ],
  }),
};
