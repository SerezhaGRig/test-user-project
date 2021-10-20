const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const validator = require("email-validator");
const passwordValidator = require("password-validator");

const router = new Router();
const schema = new passwordValidator();
schema.is().min(8)

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
router.post('/rename', (ctx, next) => {
    const { body:{ newName } } = ctx.request;
    const token = ctx.request.headers.authorization.slice(7)
    ctx.body = Controller.rename(token, newName);
},)

module.exports = router