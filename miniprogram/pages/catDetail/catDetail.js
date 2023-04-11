var _id = "1";
const app = getApp();

Page({
  data: {
    cat: {},
    url: app.globalData.url,
    nums: [{
      num: 1
    }, ],
  },

  onLoad: function (options) {
    _id = options._id;
    console.log(_id)
    app.mpServerless.db.collection('WanliuMeow').find({
      _id: _id,
    }, {}).then(res => {
      console.log(res)
      this.setData({
        cat: res.result[0],
        photoscr: "https://pku-1257850266.cos.ap-beijing.myqcloud.com/cat/" + res.result[0].name + ".png"
      });
    }).then(res => {
      var number = 0
      var photoNum = 0
      for (var j in this.data.cat.photos) {
        var photoNum = {
          num: photoNum
        }
        this.setData({
          photoNums: this.data.photoNums.concat(photoNum),
        });
        number++
      }
    });
  },

 upload() {
    wx.showLoading({
      title: '更新中...',
    });
    app.mpServerless.db.collection('WanliuMeow').updateMany(
      { _id: this.data.cat._id }, {
        $set: {
          addPhotoNumber : this.data.cat.addPhotoNumber,
          furColor : this.data.cat.furColor,
          classification : this.data.cat.classification,
          gender : this.data.cat.gender,
          status : this.data.cat.status,
          isSterilization : this.data.cat.isSterilization,
          sterilizationTime : this.data.cat.sterilizationTime,
          character : this.data.cat.character,
          firstSightingTime : this.data.cat.firstSightingTime,
          appearance : this.data.cat.appearance,
          relationship : this.data.cat.relationship,
          lastEditTime: Date(),
        }
      }).then(res => {
        wx.showToast({
          icon: 'success',
          title: '操作成功',
        });
      })
      .catch(err => {
        console.error(err);
        wx.showToast({
          icon: 'error',
          title: '操作失败',
        });
      });
  },

  //音频播放  
  audioPlay(e) {
    var that = this,
      id = e.currentTarget.dataset.id,
      key = e.currentTarget.dataset.key,
      audioArr = that.data.audioArr;

    //设置状态
    audioArr.forEach((v, i, array) => {
      v.bl = false;
      if (i == key) {
        v.bl = true;
      }
    })
    that.setData({
      audioArr: audioArr,
      audKey: key,
    })

    myaudio.autoplay = true;
    var audKey = that.data.audKey,
      vidSrc = audioArr[audKey].src;
    myaudio.src = vidSrc;

    myaudio.play();

    //开始监听
    myaudio.onPlay(() => {
      console.log('开始播放');
    })

    //结束监听
    myaudio.onEnded(() => {
      console.log('自动播放完毕');
      audioArr[key].bl = false;
      that.setData({
        audioArr: audioArr,
      })
    })

    //错误回调
    myaudio.onError((err) => {
      console.log(err);
      audioArr[key].bl = false;
      that.setData({
        audioArr: audioArr,
      })
      return
    })
  },

  // 音频停止
  audioStop(e) {
    var that = this,
      key = e.currentTarget.dataset.key,
      audioArr = that.data.audioArr;
    //设置状态
    audioArr.forEach((v, i, array) => {
      v.bl = false;
    })
    that.setData({
      audioArr: audioArr
    })
    myaudio.stop();
    //停止监听
    myaudio.onStop(() => {
      console.log('停止播放');
    })
  },
  // 输入了东西
  inputText(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    this.setData({
      ['cat.' + key]: value
    });
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.catname,
      path: '/pages/catDetail/catDetail?cat_name=' + this.data.cat.name,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  onShareTimeline: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.catname,
      path: '/pages/catDetail/catDetail?cat_name=' + this.data.cat.name,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

})
//创建audio控件
const myaudio = wx.createInnerAudioContext();