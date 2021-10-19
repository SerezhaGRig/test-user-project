const Router = require('koa-router');
const handlers=require('../../controller/users/index')
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = handlers.index();
},)
router.post('/register', (ctx, next) => {
    ctx.body = handlers.register(ctx.request.body);
},)
router.post('/login', (ctx, next) => {
    ctx.body = handlers.login(ctx.request.body);
},)

module.exports = router