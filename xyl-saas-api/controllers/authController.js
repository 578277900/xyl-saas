const axios = require('axios');
const { User, Tenant } = require('../models');
const { signToken } = require('../utils/jwt');

// 微信小程序登录
const login = async (ctx) => {
  try {
    const { code, appId } = ctx.request.body;

    if (!code || !appId) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: 'Missing code or appId',
      };
      return;
    }

    // 1. 获取租户配置
    const tenant = await Tenant.findOne({ where: { appId } });
    if (!tenant) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Tenant not found',
      };
      return;
    }

    // 2. 调用微信 API 获取 openid
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${tenant.appId}&secret=${tenant.appSecret}&js_code=${code}&grant_type=authorization_code`;
    const wxRes = await axios.get(url);

    if (wxRes.data.errcode) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: `WeChat API Error: ${wxRes.data.errmsg}`,
      };
      return;
    }

    const { openid } = wxRes.data;

    // 3. 查找或创建用户
    let user = await User.findOne({
      where: {
        tenantId: tenant.id,
        openid,
      },
    });

    if (!user) {
      user = await User.create({
        tenantId: tenant.id,
        openid,
      });
    }

    // 4. 生成 JWT Token
    const token = signToken({
      userId: user.id,
      tenantId: tenant.id,
      openid,
    });

    ctx.body = {
      code: 200,
      data: {
        token,
        userInfo: user,
        tenant: {
            name: tenant.name,
            ossPath: tenant.ossPath,
            primaryColor: tenant.primaryColor
        }
      },
      message: 'Login success',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

module.exports = {
  login,
};
