const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const validator = require("email-validator");
const {jwtValidate} = require('../../services/auth/jwt')
const passwordValidator = require("password-validator");

const router = new Router();
const schema = new passwordValidator();
schema.is().min(8)

router.get('/',authMiddleware, (ctx, next) => {
    ctx.body = Controller.hello();
},)
router.post('/register', (ctx, next) => {
    const { body:{ login, password, username } } = ctx.request;
    if(!validator.validate(login)){
        ctx.body = "Input value wasn't email"
    }
    if(!schema.validate(password)){
        ctx.body = "Password minimum length is 8"
    }
    ctx.body = Controller.register({login,  password, username });
},)
router.post('/login', (ctx, next) => {
    const { body:{ login, password } } = ctx.request;
    ctx.body = Controller.login({login, password});

},)
router.post('/rename',authMiddleware, (ctx, next) => {
    const { body:{ newName } } = ctx.request;
    ctx.body = Controller.rename({login:ctx.request.sub, newName});
},)

function authMiddleware(ctx, next) {
    const authHeader = ctx.request.headers.authorization
    if (authHeader) {
        const token = authHeader.slice(7);
        try{
            const {sub} = jwtValidate(token)
            ctx.request.sub = sub;
            next();
        }catch (e) {
            ctx.status=403;
        }

    } else {
        ctx.status=401;
    }

}

module.exports = router