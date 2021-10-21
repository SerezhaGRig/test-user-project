const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const validator = require("email-validator");
const {jwtValidate} = require('../../services/auth/jwt')
const {authMiddleware,responseMiddleware,errorMiddleware}= require('../../middleware/middleware')
const passwordValidator = require("password-validator");

const router = new Router();
const schema = new passwordValidator();
schema.is().min(8)

router.get('/',authMiddleware, (ctx, next) => {
    ctx.myData = Controller.hello();
    next()
},responseMiddleware,errorMiddleware)
router.post('/register', (ctx, next) => {
    const { body:{ login, password, username } } = ctx.request;
    if(!validator.validate(login)){
        ctx.myData = "Input value wasn't email"
        next()
    }
    if(!schema.validate(password)){
        ctx.myData = "Password minimum length is 8"
        next()
    }
    ctx.myData = Controller.register({login,  password, username });
    next()
},responseMiddleware,errorMiddleware)
router.post('/login', (ctx, next) => {
    const { body:{ login, password } } = ctx.request;
    ctx.myData = Controller.login({login, password});
    next()

},responseMiddleware,errorMiddleware)
router.post('/rename',authMiddleware, (ctx, next) => {
    const { body:{ newName } } = ctx.request;
    ctx.myData = Controller.rename({login:ctx.request.sub, newName});
    next()
},responseMiddleware,errorMiddleware)




module.exports = router