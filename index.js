'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./routers/users/index')
const bodyParser = require('koa-bodyparser');
const logger = require('./utils/logger')
require("dotenv").config();
const db = require('./models/index')
const passport = require('./services/auth/passportAuth')
const session = require('koa-session')

const port = process.env.PORT || 3000;
const secret = process.env.SESSION_KEY || "another secret";

db.sequelize.sync({force:true}).then(
    ()=>{
        app.keys = [secret]
        app
            .use(bodyParser())
            .use(session({}, app))
            .use(passport.initialize())
            .use(passport.session())
            .use(router.routes())
            .use(router.allowedMethods())
            .listen(port, function(){
                logger.info(`Example app listening at http://localhost:${port}`)
            })
    }
)

