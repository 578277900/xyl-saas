const Router = require('koa-router');
const activityController = require('../controllers/activityController');

const router = new Router({
  prefix: '/api/activities',
});

// GET /api/activities - 获取所有活动
router.get('/', activityController.getActivities);

// GET /api/activities/:id - 获取单个活动
router.get('/:id', activityController.getActivityById);

// POST /api/activities - 创建活动
router.post('/', activityController.createActivity);

// PUT /api/activities/:id - 更新活动
router.put('/:id', activityController.updateActivity);

// DELETE /api/activities/:id - 删除活动
router.delete('/:id', activityController.deleteActivity);

module.exports = router;
