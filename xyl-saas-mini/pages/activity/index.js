const { request } = require('../../utils/request');

Page({
  data: {
    activities: [],
    loading: false
  },

  onLoad(options) {
    this.fetchActivities();
  },

  onPullDownRefresh() {
    this.fetchActivities().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  async fetchActivities() {
    const app = getApp();
    if (!app.globalData.tenant) {
      setTimeout(() => {
        this.fetchActivities();
      }, 500);
      return;
    }

    wx.showLoading({
      title: '加载中...',
    });

    try {
      const res = await request('/activities', {
        method: 'GET',
        data: {
          tenantId: app.globalData.tenant.id,
        }
      });
      
      if (res.code === 200) {
        const activities = res.data.map(item => ({
          ...item,
          startTimeStr: new Date(item.startTime).toLocaleString(),
          statusText: this.getStatusText(item.status)
        }));
        this.setData({
          activities
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

  getStatusText(status) {
    const map = { 0: '草稿', 1: '报名中', 2: '已结束' };
    return map[status] || '未知';
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activity/detail?id=${id}`,
    });
  }
});
