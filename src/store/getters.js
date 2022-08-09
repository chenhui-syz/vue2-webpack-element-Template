const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  realName: state => state.user.realName,
  userMenu: state => state.user.userMenu,
  oneIdAppId: state => state.user.config.oneIdAppId,
  oneIdHomePage: state => state.user.config.oneIdHomePage,
  oneIdOauthUrl: state => state.user.config.oneIdOauthUrl,
  routes: state => state.permission.routes
};

export default getters;
