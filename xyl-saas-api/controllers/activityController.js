const { Activity } = require('../models');

// 获取活动列表
const getActivities = async (ctx) => {
  try {
    const { tenantId } = ctx.query;
    const where = {};
    if (tenantId) {
      where.tenantId = tenantId;
    }

    const activities = await Activity.findAll({
      where,
      order: [['startTime', 'DESC']], // 按开始时间倒序
    });

    ctx.body = {
      code: 200,
      data: activities,
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

// 获取单个活动
const getActivityById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Activity not found',
      };
      return;
    }
    ctx.body = {
      code: 200,
      data: activity,
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

// 创建活动
const createActivity = async (ctx) => {
  try {
    const { tenantId, title, cover, content, startTime, endTime, location, maxParticipants, status } = ctx.request.body;

    if (!tenantId || !title || !startTime || !endTime) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: 'Missing required fields',
      };
      return;
    }

    const activity = await Activity.create({
      tenantId,
      title,
      cover,
      content,
      startTime,
      endTime,
      location,
      maxParticipants,
      status,
    });

    ctx.body = {
      code: 200,
      data: activity,
      message: 'Activity created successfully',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

// 更新活动
const updateActivity = async (ctx) => {
  try {
    const { id } = ctx.params;
    const updateData = ctx.request.body;

    const activity = await Activity.findByPk(id);
    if (!activity) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Activity not found',
      };
      return;
    }

    await activity.update(updateData);

    ctx.body = {
      code: 200,
      data: activity,
      message: 'Activity updated successfully',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

// 删除活动
const deleteActivity = async (ctx) => {
  try {
    const { id } = ctx.params;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Activity not found',
      };
      return;
    }

    await activity.destroy();

    ctx.body = {
      code: 200,
      message: 'Activity deleted successfully',
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
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
