const app = getApp();

Page({
  data: {

    cat: [],

    screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0,
    url: app.globalData.url,
  },


  //转发跳转页面设置
  onLoad: function (options) {
    if (options.pageId) {

      wx.navigateTo({
        url: '/pages/cats/' + options.pageId + '/' + options.pageId,
      })
    }
    this.loadMoreCat();

  },

  onReachBottom: function () {
    this.loadMoreCat();
  },

  loadMoreCat() {

    const cat = this.data.cat;
    app.mpServerless.db.collection('WanliuMeow').find(
      {
        status: "健康",
        classification: "5",
      },
      {
        // sort: { pinyin: 1 },
        skip: cat.length,
        limit: 20,
      }
    ).then(res => {
      const { result: data } = res;
      this.setData({ cat: cat.concat(data) });
    }).catch(console.error);

  },


  //转发此页面的设置
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      path: 'pages/index/index',  // 路径，传递参数到指定页面。
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

})

