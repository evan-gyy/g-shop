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

  'GET /api/admin/category': [
    {
      id: 1,
      pid: 0,
      name: '电子数码',
      level: 1,
      status: 1,
      children: [
        {
          id: 3,
          pid: 1,
          name: '手机',
          level: 2,
          status: 1,
          children: [
            {
              id: 5,
              pid: 3,
              name: '华为',
              level: 3,
              status: 1,
            },
            {
              id: 6,
              pid: 3,
              name: '小米',
              level: 3,
              status: 1,
            },
          ],
        },
        {
          id: 4,
          pid: 1,
          name: '电脑',
          level: 2,
          status: 1,
          children: [
            {
              id: 7,
              pid: 4,
              name: '戴尔',
              level: 3,
              status: 1,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      pid: 0,
      name: '服装衣帽',
      level: 1,
      status: 1,
      children: [
        {
          id: 9,
          pid: 2,
          name: '男装',
          level: 2,
          status: 1,
          children: [],
        },
        {
          id: 10,
          pid: 2,
          name: '女装',
          level: 2,
          status: 1,
          children: [],
        },
      ],
    },
  ],
};
