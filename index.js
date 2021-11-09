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
const cors = require('koa-cors');
const proxy = require("koa-proxies");
const {responseMiddleware}  = require('./middleware/middleware')

const port = process.env.PORT || 3000;
const secret = process.env.SESSION_KEY || "another secret";

app.proxy=true
app.keys = [secret]
app
      .use(cors({
          credentials:true,
          methods:['GET', 'PUT', 'POST']
      }))
    .use(bodyParser())
    .use(session({httpOnly: true,secure:false}, app))
    .use(passport.initialize())
    .use(passport.session())
    .use(responseMiddleware)
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port, function(){
        logger.info(`Example app listening at http://localhost:${port}`)
    })
