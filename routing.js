const Router = require('koa-router');
const handlers=require('handling')
const router = Router();

router.get('/', handlers.index)
router.post('/register', handlers.register)
router.post('/login', handlers.login)

module.exports = router