const menuList = [
  {
    title: '首页', // 菜单标题名称
    url: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    url: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        url: '/category',
        icon: 'bars'
      },
      {
        title: '商品管理',
        url: '/product',
        icon: 'tool'
      },
    ]
  },

  {
    title: '用户管理',
    url: '/user',
    icon: 'user'
  },
  {
    title: '部门管理',
    url: '/department',
    icon: 'tool'
  },
  {
    title: '角色管理',
    url: '/role',
    icon: 'safety',
  },

  {
    title: '图形图表',
    url: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        url: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        url: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        url: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },

  {
    title: '订单管理',
    url: '/order',
    icon: 'windows',
  },
]

export default menuList