const Router = require('koa-router');
const api = require('./api');

let router = new Router();

async function getCommonData() {
    let individuation = await api.getIndividuationData();
    let nickname = individuation.nickname || '';
    let self_intro = individuation.self_intro || '';
    let portrait = individuation.portrait || '';
    let articleTotal = await api.getArticleTotal();
    let labelTotal = await api.getLabelTotal();
    let banner = await api.getBannerData();
    let businessCard = {nickname, self_intro, portrait, articleTotal, labelTotal};
    let sideBar = {businessCard, banner};
    return {individuation, sideBar};
}

router
    .get('/', async ctx => {
        let commonData = await getCommonData();
        let articleList = await api.getArticleListData();
        await ctx.render('./pages/index', {
            individuation: commonData.individuation,
            banner: commonData.sideBar.banner,
            sideBar: commonData.sideBar,
            articleList
        });
    })
    .get('/archive', async ctx => {
        let commonData = await getCommonData();
        let articleArchive = await api.getArticleArchive();
        await ctx.render('./pages/archive', {
            individuation: commonData.individuation,
            sideBar: commonData.sideBar,
            articleArchive
        });
    });

module.exports = router;