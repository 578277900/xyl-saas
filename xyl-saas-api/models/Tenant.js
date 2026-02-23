const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Tenant = sequelize.define('Tenant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '小程序名称/学校名称',
  },
  appId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '微信小程序AppID',
  },
  appSecret: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '微信小程序AppSecret',
  },
  ossPath: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '/xyl-saas/default',
    comment: 'OSS存储路径，例如 /xyl-saas/mini1',
  },
  primaryColor: {
    type: DataTypes.STRING,
    defaultValue: '#c62f2f', // 默认深红色
    comment: '主色调',
  },
  logo: {
    type: DataTypes.STRING,
    comment: 'Logo图片地址',
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '状态: 1启用, 0禁用',
  },
}, {
  tableName: 'tenants',
  timestamps: true,
  underscored: true,
});

module.exports = Tenant;
