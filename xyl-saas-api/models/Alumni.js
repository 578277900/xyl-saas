const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Alumni = sequelize.define('Alumni', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '姓名',
  },
  gender: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment: '性别 0未知 1男 2女',
  },
  enrollmentYear: {
    type: DataTypes.INTEGER,
    comment: '入学年份',
  },
  graduationYear: {
    type: DataTypes.INTEGER,
    comment: '毕业年份',
  },
  department: {
    type: DataTypes.STRING,
    comment: '院系',
  },
  major: {
    type: DataTypes.STRING,
    comment: '专业',
  },
  className: {
    type: DataTypes.STRING,
    comment: '班级',
  },
  studentId: {
    type: DataTypes.STRING,
    comment: '学号',
  },
  city: {
    type: DataTypes.STRING,
    comment: '所在城市',
  },
  company: {
    type: DataTypes.STRING,
    comment: '工作单位',
  },
  position: {
    type: DataTypes.STRING,
    comment: '职位',
  },
  phone: {
    type: DataTypes.STRING,
    comment: '联系电话',
  },
  email: {
    type: DataTypes.STRING,
    comment: '电子邮箱',
  },
  avatar: {
    type: DataTypes.STRING,
    comment: '照片/头像',
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '状态 1正常 0禁用/未审核',
  },
}, {
  tableName: 'alumni',
  timestamps: true,
  underscored: true,
});

module.exports = Alumni;
