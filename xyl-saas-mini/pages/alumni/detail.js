Page({
  data: {
    info: null,
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
      const { request } = require('../../utils/request');
      const res = await request(`/alumni/${id}`);
      
      if (res.code === 200) {
        this.setData({
          info: res.data
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

  makeCall() {
    if (this.data.info.phone) {
      wx.makePhoneCall({
        phoneNumber: this.data.info.phone,
      });
    }
  }
});
