var _id = "1";
const app = getApp();

Page({
  data: {
    cat: {},
    url: app.globalData.url,
    nums: [{
      num: 1
    }, ],
    classification: 0,
    classificationArray: ['狸花', '橘猫及橘白', '奶牛', '玳瑁及三花', '纯色'],
    pickers: {
      gender: ['', '公', '母'],
      isSterilization: ['', '已绝育', '未绝育'],
      status: ['', '健康', '送养', '失踪', '离世'],
      character: ['', '亲人可抱', '亲人不可抱 可摸', '薛定谔亲人', '吃东西时可以一直摸', '吃东西时可以摸一下', '怕人 安全距离 1m 以内', '怕人 安全距离 1m 以外'],
    },
    picker_selected: {},
  },

  bindPickerChangeClassification: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      classification: e.detail.value,
      "cat.classification": e.detail.value
    })
  },

  onLoad: function (options) {
    _id = options._id;
    app.mpServerless.db.collection('WanliuMeow').find({
      _id: _id,
    }, {}).then(res => {
      // console.log(res)
      this.setData({
        cat: res.result[0],
        classification: res.result[0].classification,
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
    }).then(res => {
      var picker_selected = {};
      const pickers = this.data.pickers;
      console.log(pickers)
      for (const key in pickers) {
        const items = pickers[key];
        const value = this.data.cat[key];
        const idx = items.findIndex((v) => v === value);
        if (idx === -1 && typeof value === "number") {
          picker_selected[key] = value;
        } else {
          picker_selected[key] = idx;
        }
      }
      this.setData({
        picker_selected: picker_selected,
      });
    })
  },

  // 选择日期
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    console.log(key)
    this.setData({
      ['cat.' + key]: value
    })
  },

  // 选择了东西
  bindPickerChange(e) {
    const key = e.currentTarget.dataset.key;
    const index = e.detail.value;
    var value = this.data.pickers[key][index];
    console.log(value)
    this.setData({
      ['cat.' + key]: value
    });
  },

  upload() {
    wx.showLoading({
      title: '更新中...',
    });
    app.mpServerless.db.collection('WanliuMeow').updateMany({
        _id: this.data.cat._id
      }, {
        $set: {
          addPhotoNumber: this.data.cat.addPhotoNumber,
          furColor: this.data.cat.furColor,
          classification: this.data.cat.classification,
          gender: this.data.cat.gender,
          status: this.data.cat.status,
          isSterilization: this.data.cat.isSterilization,
          sterilizationTime: this.data.cat.sterilizationTime,
          character: this.data.cat.character,
          firstSightingTime: this.data.cat.firstSightingTime,
          appearance: this.data.cat.appearance,
          relationship: this.data.cat.relationship,
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