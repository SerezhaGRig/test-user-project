const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const validator = require("email-validator");
const {jwtValidate} = require('../../services/auth/jwt')
const {authMiddleware,responseMiddleware,errorMiddleware}= require('../../middleware/middleware')
const passwordValidator = require("password-validator");
const { Sequelize } = require('sequelize');
const router = new Router();
const schema = new passwordValidator();
schema.is().min(8)

router.get('/',authMiddleware, async (ctx, next) => {
    ctx.myData = await Controller.hello();
    await next()
},responseMiddleware,errorMiddleware)


router.post('/register', async (ctx, next) => {
    const { body:{ login, password, username } } = ctx.request;
    if(!validator.validate(login)){
        ctx.myData = {result:"Input value wasn't email"}
        await next()
    }
    if(!schema.validate(password)){
        ctx.myData = {result:"Password minimum length is 8"}
        await next()
    }
    ctx.myData =await Controller.register({login,  password, username });
    await next()
},responseMiddleware,errorMiddleware)


router.post('/login', async (ctx, next) => {
    const { body:{ login, password } } = ctx.request;
    ctx.myData = await Controller.login({login, password});
    await next()
},responseMiddleware,errorMiddleware)


router.post('/rename',authMiddleware, async (ctx, next) => {
    const { body:{ newName } } = ctx.request;
    ctx.myData = await Controller.rename({login:ctx.request.sub, newName});
    await next()
},responseMiddleware,errorMiddleware)




module.exports = router