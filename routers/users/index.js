const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const validator = require("email-validator");
const {jwtValidate} = require('../../services/auth/jwt')
const {authMiddleware,responseMiddleware,loggedIn}= require('../../middleware/middleware')
const CustomError = require('../../errors/customError')
const passwordValidator = require("password-validator");
const { Sequelize } = require('sequelize');
const passport = require('../../services/auth/passportAuth')


const router = new Router();
const schema = new passwordValidator();
schema.is().min(8)


router.get('/',responseMiddleware,loggedIn, async (ctx, next) => {
    return await Controller.hello({login:ctx.state.user});
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

router.post('/logout',responseMiddleware,async (ctx, next)=> {
    ctx.logout()
    return  await Controller.logout();
})

router.post('/addCar',responseMiddleware,async (ctx, next)=> {
    const { body:{ brand, year, model,regnum } } = ctx.request;
    login = ctx.state.user
    console.log(ctx.request.body)
    return  await Controller.addCar({ brand, year, model,regnum, login });
})

router.get('/cars',responseMiddleware,loggedIn,async (ctx, next)=> {
    return  await Controller.getCars();
})

router.post('/login',passport.authenticate('local'),responseMiddleware,async (ctx, next)=> {
    return  await Controller.login();
})


router.post('/rename',responseMiddleware,loggedIn, async (ctx, next) => {
    const { body:{ newName } } = ctx.request;
    return await Controller.rename({login:ctx.state.user, newName});
})

router.get('/brands',responseMiddleware, async (ctx, next) => {
    return await Controller.getBrands();
})

router.get('/models/:brand',responseMiddleware, async (ctx, next) => {
    console.log(ctx.params.brand)
    let brand = ctx.params.brand;
    return await Controller.getModelsByBrand({brand});
})

module.exports = router