export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'PieChartOutlined',
    component: './DashBoard',
  },
  {
    path: '/user',
    name: 'user',
    icon: 'UserOutlined',
    component: './User',
  },
  {
    path: '/goods',
    name: 'goods',
    icon: 'ShoppingOutlined',
    component: './Goods',
  },
  {
    component: './404',
  },
];
