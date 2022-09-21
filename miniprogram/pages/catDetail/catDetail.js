var cat_id = "1";
const app = getApp();

Page({
  data: {
    cat: {},

    catname: "Name",
    catitems: [
      {
        category: "昵称",
        content: " 内姆",
      },
      {
        category: "毛色",
        content: " 橘",
      },
      {
        category: "性别",
        content: " 母",
      },
      {
        category: "状况",
        content: " 健康",
      },
      {
        category: "绝育情况",
        content: " 已绝育",
      },
      {
        category: "性格",
        content: " 怕人 安全距离 1m 以内",
      },
      {
        category: "外貌",
        content: " 鼻子上有黑点，微笑唇，毛色比小可深",
      },
      {
        category: "更多",
        content: " 母随子姓，随nature姓内",
      },
      {
        category: "关系",
        content: " 炸鸡、面包、nature、霖霖的妈妈，喜欢和小可贴贴",
      },

    ],
    url: app.globalData.url,
    relationship: [{ rela: "霖霖" },
    { rela: "面包" },
    { rela: "炸鸡" },
    { rela: "小可" },
    ],
    nums: [
      { num: 1 },
    ],
  },

  onLoad: function (options) {
    cat_id = options.cat_id;
    console.log(cat_id)
    console.log('test')
    app.mpServerless.db.collection('WanliuMeow').find(
      {
        _id: cat_id,
      },
      {}
    ).then(res => {
      console.log(res)
        this.setData({
          cat: res.result[0],
          photoscr: "https://pku-1257850266.cos.ap-beijing.myqcloud.com/cat/" + res.result[0].name + ".png"
        });
      }).then(res => {
      var number = 0
      var photoNum = 0
      for(var j in this.data.cat.photos){
        var photoNum = {
          num: photoNum
        }
        this.setData({
          photoNums: this.data.photoNums.concat(photoNum),
        });
        number++
      }
      
      for (var i in this.data.cat.markers) {
        var marker = [
          {
            iconPath: "https://pku-1257850266.cos.ap-beijing.myqcloud.com/cat/" + encodeURIComponent(this.data.cat.name) + ".png",
            latitude: this.data.cat.markers[i].coordinates[1],
            longitude: this.data.cat.markers[i].coordinates[0],
            width: 50,
            height: 50,
            id: number,
          }
        ]
        this.setData({
          markers: this.data.markers.concat(marker),
        });
        number++
      }
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


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.catname,
      path: '/pages/index/index?pageId=' + this.data.catname,
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
      path: '/pages/index/index?pageId=' + this.data.catname,
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

