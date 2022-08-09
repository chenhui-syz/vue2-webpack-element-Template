/**
 * 配置描述
 *
 * name: 'router-name'          路由名称（必填） - 配合keep-alive场景使用，必须与组件name属性保持一致！！！
 * component: 'component'       组件 - 默认Layout组件
 * icon: 'svg-name'             导航栏图标 - 读取icon文件夹下的svg图标
 * redirect: 'redirect-path'    重定向地址
 * noCache: true|false          不使用缓存 - 默认false，如设置true则不缓存页面
 * noLayout: true|false         不使用Layout - 默认false，是否使用公共Layout
 * hidden: true|false           页面强制隐藏 - 默认false，如设置true则不显示在导航栏
 * alwaysShow: true|false       菜单强制显示 - 默认false，如设置true则强制显示菜单
 * breadcrumb: true|false       面包屑 - 默认true，如设置false则不显示在面包屑中
 */
export function menuConfig() {
  return {
    // 组件管理
    'MENU_COMPONENTS': {
      name: 'components',
      icon: 'hotel',
      redirect: '/xxx/xxx'
    },
    // 组件管理-输入框组件
    'MENU_INPUT_COMPONENTS': {
      name: 'components',
      icon: 'hotel',
      redirect: '/oxInputComponents/oxInputComponents'
    },
    'PAGE_INPUT_COMPONENTS': {
      name: 'oxInputComponents',
      meta: { watermark: true },
      component: () => import('@/views/oxInputComponents/oxInputComponents'),
      noCache: false,
      hidden: true,
      breadcrumb: false
    },
    // 组件管理-上传组件
    'MENU_UPLOAD_COMPONENTS': {
      name: 'componentsUpload',
      icon: 'hotel',
      redirect: '/uploadComponents/uploadComponents'
    },
    'PAGE_UPLOAD_COMPONENTS': {
      name: 'uploadComponents',
      meta: { watermark: true },
      component: () => import('@/views/UploadComponents/UploadComponents'),
      noCache: false,
      hidden: true,
      breadcrumb: false
    }, 
    // 组件管理-图片水印
    'MENU_WATERMARK': {
      name: 'imagewatermark',
      icon: 'hotel',
      redirect: '/UploadImage/waterMark'
    },
    'PAGE_WATERMARK': {
      name: 'pagewatermark',
      meta: { watermark: true },
      component: () => import('@/views/UploadImage/waterMark'),
      noCache: false,
      hidden: true,
      breadcrumb: false
    },
    // 组件管理-表格组件
    'MENU_TABLE_COMPONENTS': {
      name: 'componentsTable',
      icon: 'hotel',
      redirect: '/tableComponents/tableComponents'
    },
    'PAGE_TABLE_COMPONENTS': {
      name: 'tableComponents',
      meta: { watermark: true },
      component: () => import('@/views/tableComponents/tableComponents'),
      noCache: false,
      hidden: true,
      breadcrumb: false
    },
    // 组件管理-选择框组件
    'MENU_SELECT': {
      name: 'select',
      icon: 'hotel',
      redirect: '/selectComponents/index'
    },
    'PAGE_SELECT': {
      name: 'select',
      meta: { watermark: true },
      component: () => import('@/views/selectComponents/index'),
      noCache: false,
      hidden: true,
      breadcrumb: false
    },
    // 系统管理
    'MENU_SYSTEM': {
      name: 'System',
      icon: 'system',
      redirect: '/yyyyy/yyyyyy'
    },
    // 系统管理-日志管理
    'MENU_SYSTEM_LOG': {
      name: 'SystemLog',
      redirect: '/system/log/list'
    },
    'PAGE_SYSTEM_LOG': {
      name: 'SystemLogList',
      component: () => import('@/views/system/log/list'),
      noCache: false,
      hidden: true,
      breadcrumb: false
    },
    // 酒店管理
    'MENU_HOTEL_MANAGE': {
      name: 'Hotelmdm',
      icon: 'hotel',
      redirect: '/zzz/zzz'
    },
    // 酒店管理-酒店列表
    'MENU_HOTEL': {
      name: 'Hotel',
      redirect: '/hotelmdm/hotel/list'
    },
    'PAGE_HOTEL_LIST': {
      name: 'HotelList',
      component: () => import('@/views/hotelmdm/hotel/list'),
      noCache: false,
      hidden: true,
      breadcrumb: false
    },
    // 酒店详情页，此页面没有左侧导航栏入口，所以只需要配置page就可以了
    'PAGE_HOTEL_DETAIL': {
      name: 'HotelDetail',
      component: () => import('@/views/hotelmdm/hotel/detail'),
      noCache: true,
      hidden: true
    }
  };
}
