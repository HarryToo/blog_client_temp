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
        let pageIndex = ctx.query.pageIndex;
        let labelId = ctx.query.labelId;
        let searchVal = ctx.query.searchVal;
        let labelName = '';
        let articleList = {};
        if (searchVal) {
            articleList = await api.getArticleList({searchVal, pageIndex});
        } else if (labelId) {
            articleList = await api.getArticleListByLabelId({labelId, pageIndex});
            labelName = await api.getLabelNameById({id: labelId});
        } else {
            articleList = await api.getArticleList({pageIndex});
        }
        await ctx.render('./pages/index', {
            individuation: commonData.individuation,
            banner: commonData.sideBar.banner,
            sideBar: commonData.sideBar,
            searchVal,
            labelName,
            articleList
        });
    })
    .get('/archive', async ctx => {
        let commonData = await getCommonData();
        let pageIndex = ctx.query.pageIndex;
        let pageSize = 12;
        let archiveList = await api.getArticleArchive({pageIndex, pageSize});
        await ctx.render('./pages/archive', {
            individuation: commonData.individuation,
            sideBar: commonData.sideBar,
            archiveList
        });
    })
    .get('/label', async ctx => {
        let commonData = await getCommonData();
        let labelList = await api.getLabelList();
        await ctx.render('./pages/label', {
            individuation: commonData.individuation,
            sideBar: commonData.sideBar,
            labelList
        });
    })
    .get('/diary', async ctx => {
        let commonData = await getCommonData();
        let month = '', diaryList = [];
        if (ctx.query.month) {
            // client端异步请求
            month = ctx.query.month;
            diaryList = await api.getDiaryList({month});
            ctx.body = {diaryList};
        } else {
            let y = new Date().getFullYear();
            let m = new Date().getMonth() + 1;
            m = m < 10 ? `0${m}` : m;
            month = `${y}-${m}-01`;
            diaryList = await api.getDiaryList({month});
            await ctx.render('./pages/diary', {
                individuation: commonData.individuation,
                sideBar: commonData.sideBar,
                diaryList
            });
        }
    })
    .get('/about', async ctx => {
        let commonData = await getCommonData();
        await ctx.render('./pages/about', {
            individuation: commonData.individuation,
            sideBar: commonData.sideBar
        });
    })
    .get('/article', async ctx => {
        let commonData = await getCommonData();
        let id = ctx.query.id;
        await api.updateArticleHits({id});
        let articleDetail = await api.getArticleDetail({id});
        await ctx.render('./pages/article', {
            individuation: commonData.individuation,
            sideBar: commonData.sideBar,
            articleDetail
        });
    });

module.exports = {router, getCommonData};