const app = getApp();

Page({
  data: {

    cat_health: [],

    fostered_cat: [
    ],
    unknown_cat: [
    ],
    dead_cat: [
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
    this.loadMoreCat_fostered();
    this.loadMoreCat_unknown();
    this.loadMoreCat_dead();
  },

  onReachBottom: function () {
    if (this.data.currentTab === 1) {
      this.loadMoreCat_fostered();
    }
    if (this.data.currentTab === 2) {
      this.loadMoreCat_unknown();
    }
    if (this.data.currentTab === 3) {
      this.loadMoreCat_unknown();
    }
  },

  loadMoreCat_fostered() {

    const fostered_cat = this.data.fostered_cat;
    app.mpServerless.db.collection('WanliuMeow').find(
      {
        status: "送养",
      },
      {
        // sort: { pinyin: 1 },
        skip: fostered_cat.length,
        limit: 20,
      }
    ).then(res => {
      const { result: data } = res;
      this.setData({ fostered_cat: fostered_cat.concat(data) });
    }).catch(console.error);

  },

  loadMoreCat_unknown() {

    const unknown_cat = this.data.unknown_cat;
    app.mpServerless.db.collection('WanliuMeow').find(
      {
        status: "失踪",
      },
      {
        // sort: { pinyin: 1 },
        skip: unknown_cat.length,
        limit: 20,
      }
    ).then(res => {
      const { result: data } = res;
      this.setData({ unknown_cat: unknown_cat.concat(data) });
    }).catch(console.error);

  },

  loadMoreCat_dead() {

    const dead_cat = this.data.dead_cat;
    app.mpServerless.db.collection('WanliuMeow').find(
      {
        status: "离世",
      },
      {
        // sort: { pinyin: 1 },
        skip: dead_cat.length,
        limit: 20,
      }
    ).then(res => {
      const { result: data } = res;
      this.setData({ dead_cat: dead_cat.concat(data) });
    }).catch(console.error);

  },

  clickCat(e, isCatName = false) {
    const cat_name = isCatName ? e : e.currentTarget.dataset.cat_name;
    const detail_url = '/pages/catDetail/catDetail';
    // console.log(cat_name)
    wx.navigateTo({
      url: detail_url + '?cat_name=' + cat_name,
    });
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
    // console.log("e.detail.value");
    if (e.detail.value) {
      wx.navigateTo({
        url: "/pages/catDetail/catDetail?cat_name=" + e.detail.value,
      })
    }
  }

})

