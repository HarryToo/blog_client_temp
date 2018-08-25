const Router = require('koa-router');
let router = new Router();

router.get('/', async ctx => {
    await ctx.render('index', {data: '呵aa呵aa'});
});

module.exports = router;