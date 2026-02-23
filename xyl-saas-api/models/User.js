const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '关联的租户/小程序ID',
  },
  openid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '微信OpenID',
  },
  nickname: {
    type: DataTypes.STRING,
    comment: '昵称',
  },
  avatarUrl: {
    type: DataTypes.STRING,
    comment: '头像URL',
  },
  gender: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment: '性别 0未知 1男 2女',
  },
  phone: {
    type: DataTypes.STRING,
    comment: '手机号',
  },
  realName: {
    type: DataTypes.STRING,
    comment: '真实姓名',
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '状态 1正常 0禁用',
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['tenant_id', 'openid'], // 确保同一租户下openid唯一
    },
  ],
});

module.exports = User;
