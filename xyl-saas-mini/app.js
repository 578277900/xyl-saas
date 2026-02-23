const { request } = require('./utils/request');

App({
  onLaunch() {
    console.log('App Launch');
    this.login();
  },
  
  globalData: {
    userInfo: null,
    tenant: null,
    token: null,
  },

  async login() {
    // 1. 获取小程序 AppID (在实际开发中，这里通常通过 wx.getAccountInfoSync() 获取)
    // 但在开发工具中，可能需要手动指定或通过 ext.json 配置
    const accountInfo = wx.getAccountInfoSync();
    // 兼容开发环境，如果没有 appId，使用测试 appId
    const appId = accountInfo.miniProgram.appId || 'wxeb615e2808763b71';
    
    console.log('Current AppID:', appId);

    try {
      // 2. 微信登录
      const { code } = await wx.login();
      
      // 3. 发送 code 和 appId 到后端
      const res = await request('/auth/login', {
        method: 'POST',
        data: {
          code,
          appId
        }
      });

      if (res && res.data) {
        // 4. 保存登录态
        this.globalData.token = res.data.token;
        this.globalData.userInfo = res.data.userInfo;
        this.globalData.tenant = res.data.tenant;
        wx.setStorageSync('token', res.data.token);
        
        // 5. 应用租户配置 (如导航栏颜色)
        if (this.globalData.tenant && this.globalData.tenant.primaryColor) {
           wx.setNavigationBarColor({
             frontColor: '#ffffff',
             backgroundColor: this.globalData.tenant.primaryColor,
           })
        }
        
        console.log('Login success:', res.data);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
})
