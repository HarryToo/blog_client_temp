const axios = require('axios');
axios.interceptors.request.use(res => {
    if (/^\/api\//.test(res.url)) {
        // res.url = `https://www.doinblog.com${res.url}`;
        res.url = `http://127.0.0.1:3001${res.url.replace('/api', '')}`;
        return res;
    }
});
axios.interceptors.response.use(res => {
    return res.data
});

module.exports = {
    // 公共个性化数据
    async getIndividuationData() {
        let individuation = {};
        let {code, data} = await axios.get('/api/individuation/getIndividuation');
        if (code === 200) {
            individuation = data;
        }
        return individuation;
    },
    // banner数据
    async getBannerData() {
        let banner = [];
        let {code, data} = await axios.get('/api/article/getArticleList', {params: {isOnlyTop: true}});
        if (code === 200) {
            banner = data;
        }
        return banner;
    },
    // 获取文章列表数据
    async getArticleListData() {
        let articleList = [];
        let {code, data} = await axios.get('/api/article/getArticleList');
        if (code === 200) {
            articleList = data;
        }
        return articleList;
    },
    // 获取文章总数
    async getArticleTotal() {
        let articleTotal = 0;
        let {code, data} = await axios.get('/api/article/getArticleTotal');
        if (code === 200) {
            articleTotal = data;
        }
        return articleTotal;
    },
    // 获取标签总数
    async getLabelTotal() {
        let labelTotal = 0;
        let {code, data} = await axios.get('/api/label/getLabelTotal');
        if (code === 200) {
            labelTotal = data;
        }
        return labelTotal;
    },
    // 获取文章按月归档
    async getArticleArchive() {
        let labelTotal = 0;
        let {code, data} = await axios.get('/api/article/archiveByMonth');
        if (code === 200) {
            labelTotal = data;
        }
        return labelTotal;
    }
};