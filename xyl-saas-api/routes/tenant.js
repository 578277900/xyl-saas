const Router = require('koa-router');
const tenantController = require('../controllers/tenantController');

const router = new Router({
  prefix: '/api/tenants',
});

// GET /api/tenants - 获取所有租户
router.get('/', tenantController.getTenants);

// GET /api/tenants/:id - 获取单个租户
router.get('/:id', tenantController.getTenant);

// POST /api/tenants - 创建租户
router.post('/', tenantController.createTenant);

// PUT /api/tenants/:id - 更新租户
router.put('/:id', tenantController.updateTenant);

// DELETE /api/tenants/:id - 删除租户
router.delete('/:id', tenantController.deleteTenant);

module.exports = router;
