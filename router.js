const Router = require('koa-router');
const api = require('./api');

let router = new Router();

router
    .get('/', async ctx => {
        let getIndividuationData = await api.getIndividuationData();
        let logo = getIndividuationData.logo || '';
        let nickname = getIndividuationData.nickname || '';
        let self_intro = getIndividuationData.self_intro || '';
        let portrait = getIndividuationData.portrait || '';
        let articleTotal = await api.getArticleTotal();
        let labelTotal = await api.getLabelTotal();
        let banner = await api.getBannerData();
        let businessCard = {nickname, self_intro, portrait, articleTotal, labelTotal};
        let sideBar = {businessCard, banner};
        let articleList = await api.getArticleListData();
        await ctx.render('./pages/index', {logo, banner, articleList, sideBar});
    });

module.exports = router;