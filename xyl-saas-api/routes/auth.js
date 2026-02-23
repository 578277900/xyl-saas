const Router = require('koa-router');
const authController = require('../controllers/authController');

const router = new Router({
  prefix: '/api/auth',
});

// POST /api/auth/login - 微信登录
router.post('/login', authController.login);

module.exports = router;
