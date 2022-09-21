const app = getApp();

Page({
  data: {

    cat: [],

    fostered_catlist: [
      { name: "面包" },
      { name: "炸鸡" },
      { name: "霖霖" },
      { name: "麻团" },
      { name: "Nature" },
    ],
    unknown_catlist: [
      { name: "渣渣辉" },
      { name: "阿金" },
      { name: "嫖嫖" },
      { name: "三明治" },
      { name: "咪猫" },
    ],
    dead_catlist: [
      { name: "妲己" },
    ],
    screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0,
    navbar: ['在校', '毕业', '休学', '喵星'],
    currentTab: 0,
    url: app.globalData.url,
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  onLoad: function (options) {
    if (options.pageId) {
      wx.navigateTo({
        url: '/pages/cat/' + options.pageId + '/' + options.pageId,
      })
    }
    this.loadMoreCat();
  },


  loadMoreCat() {

    const cat = this.data.cat;
    app.mpServerless.db.collection('WanliuMeow').find(
      {},
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


  iconType: [
    'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
  ],

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
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

  // 转发到朋友圈
  onShareTimeline: function (res) {
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

  // 搜索栏输入名字后页面跳转
  bindconfirmT: function (e) {
    console.log("e.detail.value");
    if (e.detail.value) {
      wx.navigateTo({
        url: '/pages/cats/' + e.detail.value + '/' + e.detail.value,
      })
    }
  }

})

