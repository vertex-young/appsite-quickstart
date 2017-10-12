//index.js
let asLib = require('../../vendor/appsite-client-sdk/index');
let wxUser = asLib.wxUser;
let AppSite = asLib.AppSite;
let openSetting = asLib.openSetting;
//获取应用实例
Page({
  data: {
    motto: 'Hello AppSite',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    let that = this;
    let userInfo = wxUser.getUserInfo();
    if (userInfo) {
      that.setData({ userInfo: userInfo });
    } else {
      wxUser.login({
        success: function (userInfo) {
          that.setData({ userInfo: userInfo });
        }
      })
    }
  }
})
