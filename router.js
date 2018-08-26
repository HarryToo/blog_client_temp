const Router = require('koa-router');
const api = require('./api');

let router = new Router();


router
    .get('/', async ctx => {
        let {logo} = await api.getIndividuationData() || {logo: ''};
        let banner = await api.getBannerData();
        console.log(banner);
        await ctx.render('./pages/index', {logo, banner});
    });

module.exports = router;