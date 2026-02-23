const { request } = require('../../utils/request');

Page({
  data: {
    activity: null,
    loading: false
  },

  onLoad(options) {
    if (options.id) {
      this.fetchDetail(options.id);
    }
  },

  async fetchDetail(id) {
    wx.showLoading({
      title: '加载中...',
    });

    try {
      const res = await request(`/activities/${id}`);
      if (res.code === 200) {
        this.setData({
          activity: {
            ...res.data,
            startTimeStr: new Date(res.data.startTime).toLocaleString(),
            endTimeStr: new Date(res.data.endTime).toLocaleString(),
          }
        });
      }
    } catch (error) {
      console.error(error);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  onSignup() {
    wx.showToast({
      title: '报名功能开发中',
      icon: 'none'
    });
  }
});
