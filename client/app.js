//app.js
// 设置日志记录
wx.logger = console;

var config = require('./config');
var asLib = require('./vendor/appsite-client-sdk/index');

let utils = asLib.utils;
let wxUser = asLib.wxUser;
let AppSite = asLib.AppSite;
let openSetting = asLib.openSetting;

App({
  onLaunch: function () {
    // 初始化操作
    // 初始化Appsite配置信息
    AppSite.Init(this, config);

    // 用户登录
    wxUser.login({
      // 用户没有授权
      unauth: function (res) {
        // 用户没有授权，则记录已经尝试过设置授权
        AppSite.apply(AppSite.config, { tryAuth: true });
        openSetting({
          scope: 'scope.userInfo'
        });
      },
      success: function () {
        utils.logger.info('login success')
      },
      fail: function (res) {
        utils.logger.error(res);
      }
    });

    // 记录操作日志
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());

    wx.setStorageSync('logs', logs);
  },
  onShow: function (options) {
    // 监控是否用户授权
    wxUser.isAuthed({
      success: function (authed) {
        if (authed == false) {
          // 没有授权
          // 去设置授权
          openSetting({
            scope: 'scope.userInfo',
            path: options.path
          });
        }
      }
    });
  }
})