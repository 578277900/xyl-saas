const { sequelize } = require('../config/db');
require('../models'); // 引入模型以确保它们被注册

const syncDB = async () => {
  try {
    // alter: true 会根据模型定义更新表结构，而不会丢失数据
    // force: true 会删除表并重新创建（慎用）
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to sync database:', error);
    process.exit(1);
  }
};

syncDB();
