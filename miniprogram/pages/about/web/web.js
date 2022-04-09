//index.js

Page({
  data: {
    screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0
  },
  //转发功能
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      success: function (res) { }
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  copyTBL: function (e) {
  var self = this;
  wx.setClipboardData({
    data: '万柳喵喵之家',//需要复制的内容
    success: function (res) {
      // self.setData({copyTip:true}),
     
    }
  })
  }
  
})


