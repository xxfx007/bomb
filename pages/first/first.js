var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({

  onLoad: function () {

  },
  formSubmit: function (event) {

    wx.showLoading({
      title: '用户绑定中，请稍后！',
    })


    if (event.detail.value.login_name == "") {
      wx.showLoading({
        title: '请输入真实姓名',
      })
    } else if (event.detail.value.card_id == "") {
      wx.showLoading({
        title: '请输入卡号',
      })
    } else if (event.detail.value.phone_no == "") {
      wx.showLoading({
        title: '请输入电话号码',
      })
    }

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)



    // Bmob.User.logIn(event.detail.value.username, event.detail.value.paswd, {
    //   success: function (user) {
    //     wx.getStorage({
    //       key: Bmob._getBmobPath(Bmob.User._CURRENT_USER_KEY),
    //       success: function (res) {
    //         var Data = JSON.parse(res.data);
    //         common.showTip("登录成功,正在跳转", "success", function () {
    //           wx.redirectTo({
    //             url: '../index/index'
    //           })
    //         });

    //       }
    //     })
    //   },
    //   error: function (user, error) {
    //     // The login failed. Check error to see why.
    //     console.log(error)
    //     common.showTip("对不起，您输入的用户名或密码错误", "loading");
    //   }
    // });
  }
})