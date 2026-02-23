const Router = require('koa-router');
const alumniController = require('../controllers/alumniController');

const router = new Router({
  prefix: '/api/alumni',
});

// GET /api/alumni - 获取所有校友
router.get('/', alumniController.getAlumni);

// GET /api/alumni/:id - 获取单个校友
router.get('/:id', alumniController.getAlumniById);

// POST /api/alumni - 创建校友
router.post('/', alumniController.createAlumni);

// PUT /api/alumni/:id - 更新校友
router.put('/:id', alumniController.updateAlumni);

// DELETE /api/alumni/:id - 删除校友
router.delete('/:id', alumniController.deleteAlumni);

module.exports = router;
