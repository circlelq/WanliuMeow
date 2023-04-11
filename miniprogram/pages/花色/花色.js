const app = getApp();
var classification = 1;
Page({
  data: {
    cat: [],
    screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0,
    url: app.globalData.url,
  },


  onLoad: function (options) {
    classification = options.classification;
    this.loadMoreCat();
  },

  onReachBottom: function () {
    this.loadMoreCat();
  },

  loadMoreCat() {
    const cat = this.data.cat;
    app.mpServerless.db.collection('WanliuMeow').find({
      classification: classification,
      status: "健康"
    }, {
      // sort: { pinyin: 1 },
      skip: cat.length,
      limit: 20,
    }).then(res => {
      const {
        result: data
      } = res;
      this.setData({
        cat: cat.concat(data)
      });
    }).catch(console.error);
  },
})