const { Tenant } = require('../models');

// 获取所有租户
const getTenants = async (ctx) => {
  try {
    const tenants = await Tenant.findAll();
    ctx.body = {
      code: 200,
      data: tenants,
      message: 'Success',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

// 获取单个租户
const getTenant = async (ctx) => {
  try {
    const { id } = ctx.params;
    const tenant = await Tenant.findByPk(id);
    if (!tenant) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Tenant not found',
      };
      return;
    }
    ctx.body = {
      code: 200,
      data: tenant,
      message: 'Success',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

// 创建租户
const createTenant = async (ctx) => {
  try {
    const { name, appId, appSecret, ossPath } = ctx.request.body;
    // 简单校验
    if (!name || !appId || !appSecret) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: 'Missing required fields',
      };
      return;
    }

    const tenant = await Tenant.create({
      name,
      appId,
      appSecret,
      ossPath,
    });

    ctx.body = {
      code: 200,
      data: tenant,
      message: 'Tenant created successfully',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

// 更新租户
const updateTenant = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { name, appId, appSecret, ossPath, status } = ctx.request.body;

    const tenant = await Tenant.findByPk(id);
    if (!tenant) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Tenant not found',
      };
      return;
    }

    await tenant.update({
      name,
      appId,
      appSecret,
      ossPath,
      status,
    });

    ctx.body = {
      code: 200,
      data: tenant,
      message: 'Tenant updated successfully',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

// 删除租户
const deleteTenant = async (ctx) => {
  try {
    const { id } = ctx.params;
    const tenant = await Tenant.findByPk(id);
    if (!tenant) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Tenant not found',
      };
      return;
    }

    await tenant.destroy();

    ctx.body = {
      code: 200,
      message: 'Tenant deleted successfully',
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
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
};
