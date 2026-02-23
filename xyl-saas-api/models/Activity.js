const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Activity = sequelize.define('Activity', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '活动标题',
  },
  cover: {
    type: DataTypes.STRING,
    comment: '活动封面图',
  },
  content: {
    type: DataTypes.TEXT,
    comment: '活动详情内容',
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '开始时间',
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '结束时间',
  },
  location: {
    type: DataTypes.STRING,
    comment: '活动地点',
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '最大参与人数，0表示不限',
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment: '状态 0草稿 1已发布 2已结束',
  },
}, {
  tableName: 'activities',
  timestamps: true,
  underscored: true,
});

module.exports = Activity;
