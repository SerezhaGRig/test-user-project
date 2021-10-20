const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = Controller.index();
},)
router.post('/register', (ctx, next) => {
    const { body:{ login, password, username } } = ctx.request;
    if(!validator.validate(login)){
        ctx.body = "Input value wasn't email"
    }
    if(!schema.validate(password)){
        ctx.body = "Password minimum length is 8"
    }
    ctx.body = Controller.register(login, password, username );
},)
router.post('/login', (ctx, next) => {
    const { body:{ login, password } } = ctx.request;
    ctx.body = Controller.login(login, password);
},)

module.exports = router