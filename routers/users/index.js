const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = Controller.index();
},)
router.post('/register', (ctx, next) => {
    ctx.body = Controller.register(ctx.request.body);
},)
router.post('/login', (ctx, next) => {
    ctx.body = Controller.login(ctx.request.body);
},)

module.exports = router