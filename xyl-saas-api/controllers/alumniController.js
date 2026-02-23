const { Alumni } = require('../models');

// 获取校友列表
const getAlumni = async (ctx) => {
  try {
    const { tenantId } = ctx.query;
    const where = {};
    if (tenantId) {
      where.tenantId = tenantId;
    }
    // 可以在这里添加更多的过滤条件，例如姓名、年份等

    const alumni = await Alumni.findAll({ where });
    ctx.body = {
      code: 200,
      data: alumni,
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

// 获取单个校友
const getAlumniById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const alumni = await Alumni.findByPk(id);
    if (!alumni) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Alumni not found',
      };
      return;
    }
    ctx.body = {
      code: 200,
      data: alumni,
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

// 创建校友
const createAlumni = async (ctx) => {
  try {
    const { tenantId, name, gender, enrollmentYear, graduationYear, department, major, className, studentId, city, company, position, phone, email, status } = ctx.request.body;
    
    if (!tenantId || !name) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: 'Missing required fields',
      };
      return;
    }

    const alumni = await Alumni.create({
      tenantId,
      name,
      gender,
      enrollmentYear,
      graduationYear,
      department,
      major,
      className,
      studentId,
      city,
      company,
      position,
      phone,
      email,
      status,
    });

    ctx.body = {
      code: 200,
      data: alumni,
      message: 'Alumni created successfully',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

// 更新校友
const updateAlumni = async (ctx) => {
  try {
    const { id } = ctx.params;
    const updateData = ctx.request.body;

    const alumni = await Alumni.findByPk(id);
    if (!alumni) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Alumni not found',
      };
      return;
    }

    await alumni.update(updateData);

    ctx.body = {
      code: 200,
      data: alumni,
      message: 'Alumni updated successfully',
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
};

// 删除校友
const deleteAlumni = async (ctx) => {
  try {
    const { id } = ctx.params;
    const alumni = await Alumni.findByPk(id);
    if (!alumni) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: 'Alumni not found',
      };
      return;
    }

    await alumni.destroy();

    ctx.body = {
      code: 200,
      message: 'Alumni deleted successfully',
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
  getAlumni,
  getAlumniById,
  createAlumni,
  updateAlumni,
  deleteAlumni,
};
