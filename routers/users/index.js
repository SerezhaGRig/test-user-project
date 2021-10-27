const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const validator = require("email-validator");
const {jwtValidate} = require('../../services/auth/jwt')
const {authMiddleware,responseMiddleware}= require('../../middleware/middleware')
const CustomError = require('../../errors/customError')
const passwordValidator = require("password-validator");
const { Sequelize } = require('sequelize');


const router = new Router();
const schema = new passwordValidator();
schema.is().min(8)


router.get('/',responseMiddleware,authMiddleware, async (ctx, next) => {
    return await Controller.hello();
})


router.post('/register',responseMiddleware, async (ctx, next) => {
    const { body:{ login, password, username } } = ctx.request;
     if(!validator.validate(login)){
         throw new CustomError({code:403,message:"Input value wasn't email"})
     }
     if(!schema.validate(password)){
         throw new CustomError({code:403,message:"Password minimum length is 8"})
     }
    return  await Controller.register({login,  password, username });
})


router.post('/login',responseMiddleware, async (ctx, next) => {
    const { body:{ login, password } } = ctx.request;
    return await Controller.login({login, password});
})


router.post('/rename',responseMiddleware,authMiddleware, async (ctx, next) => {
    const { body:{ newName } } = ctx.request;
    return await Controller.rename({login:ctx.request.sub, newName});
})


module.exports = router