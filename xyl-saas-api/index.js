const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { connectDB } = require('./config/db');
const tenantRoutes = require('./routes/tenant');
const authRoutes = require('./routes/auth');
const alumniRoutes = require('./routes/alumni');
require('dotenv').config();

const app = new Koa();
const router = new Router();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser());

// Database connection
connectDB();

// Basic route
router.get('/', (ctx) => {
  ctx.body = 'Hello xyl-saas-api!';
});

// Routes
app.use(router.routes()).use(router.allowedMethods());
app.use(tenantRoutes.routes()).use(tenantRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(alumniRoutes.routes()).use(alumniRoutes.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
