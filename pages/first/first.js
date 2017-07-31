var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();

Page({

  onLoad: function (e) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    this.setData({
      "login_name": "王艳明",
      "card_id": "080621",
      "phone_no": "13009419939"
    });


  },
  formSubmit: function (event) {

    wx.showLoading({
      title: '用户绑定中，请稍后！',
    });

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

    //check the name is exist in "member"?  
    var member = Bmob.Object.extend("member");
    var query = new Bmob.Query(member);

    query.equalTo("wx_name", event.detail.value.wxname);
    query.find({
      success: function (results) {
        var cnt = results.length;
        if (cnt == 0) {
          //微信名在数据库中不存在，需要验证一些信息,之后绑定
          query.equalTo("name", event.detail.value.login_name);
          query.find({
            success: function (results) {
              console.log("共查询到 " + results.length + " 条记录");
              var cnt = results.length;
              if (cnt == 0) {
                wx.showLoading({
                  title: '该姓名查询不到，不能绑定!!!',
                });
              } else {
                //该用户存在,可以继续
                query.equalTo("name", event.detail.value.login_name);
                query.equalTo("card_id", event.detail.value.card_id);
                query.find({
                  success: function (results) {
                    var cnt = results.length;
                    if (cnt == 0) {
                      wx.showLoading({
                        title: '该卡号查询不到，不能绑定!!!',
                      });
                    } else {
                      // 卡号也存在，可以继续
                      // 执行update语句，更新微信名
                      
                    }
                  },
                  error: function (error) { }
                })

              }

            },
            error: function (error) {
              console.log("查询失败: " + error.code + " " + error.message);
            }
          });

        } else {
          //该用户已经绑定了，可以直接跳转

        }
      },
      error: function (error) { }
    })
    


    setTimeout(function () {
      wx.hideLoading()
    }, 2000);



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