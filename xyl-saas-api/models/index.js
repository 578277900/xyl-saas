const Tenant = require('./Tenant');
const User = require('./User');
const Alumni = require('./Alumni');
const Activity = require('./Activity');

// 定义关联关系
Tenant.hasMany(User, { foreignKey: 'tenantId', as: 'users' });
User.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });

Tenant.hasMany(Alumni, { foreignKey: 'tenantId', as: 'alumni' });
Alumni.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });

Tenant.hasMany(Activity, { foreignKey: 'tenantId', as: 'activities' });
Activity.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });

module.exports = {
  Tenant,
  User,
  Alumni,
  Activity,
};
