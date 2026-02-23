Page({
  data: {
    searchValue: '',
    alumniList: [],
    loading: false
  },

  onLoad(options) {
    this.fetchAlumni();
  },

  onSearch(e) {
    this.setData({
      searchValue: e.detail
    });
    this.fetchAlumni();
  },

  onClear() {
    this.setData({
      searchValue: ''
    });
    this.fetchAlumni();
  },

  async fetchAlumni() {
    const app = getApp();
    if (!app.globalData.tenant) {
      // 如果 tenant 还没加载好，等待一下或者稍后重试
      setTimeout(() => {
        this.fetchAlumni();
      }, 500);
      return;
    }

    wx.showLoading({
      title: '加载中...',
    });

    try {
      const { request } = require('../../utils/request');
      const res = await request('/alumni', {
        method: 'GET',
        data: {
          tenantId: app.globalData.tenant.id,
          name: this.data.searchValue // 简单的搜索，实际后端可以支持更复杂的查询
        }
      });
      
      if (res.code === 200) {
        this.setData({
          alumniList: res.data
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

  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/alumni/detail?id=${id}`,
    });
  }
});
