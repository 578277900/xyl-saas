const Tenant = require('./Tenant');
const User = require('./User');
const Alumni = require('./Alumni');

// 定义关联关系
Tenant.hasMany(User, { foreignKey: 'tenantId', as: 'users' });
User.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });

Tenant.hasMany(Alumni, { foreignKey: 'tenantId', as: 'alumni' });
Alumni.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });

module.exports = {
  Tenant,
  User,
  Alumni,
};
