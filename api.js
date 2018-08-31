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
    async getArticleList(params) {
        let articleList = {};
        let {code, data, pageIndex, pageTotal} = await axios.get('/api/article/getArticleList', {params});
        if (code === 200) {
            articleList = {
                data,
                pageIndex,
                pageTotal
            };
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
    // 获取标签对应文章列表数据
    async getArticleListByLabelId(params) {
        let articleList = {};
        let {code, data, pageIndex, pageTotal} = await axios.get('/api/article/getArticleListByLabelId', {params});
        if (code === 200) {
            articleList = {
                data,
                pageIndex,
                pageTotal
            };
        }
        return articleList;
    },
    // 获取标签名
    async getLabelNameById(params) {
        let labelName = '';
        let {code, data} = await axios.post('/api/label/getLabelById', params);
        if (code === 200) {
            labelName = data.name;
        }
        return labelName;
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
    // 获取文章按月归档数据
    async getArticleArchive(params) {
        let archiveList = [];
        let {code, data, pageIndex, pageTotal} = await axios.get('/api/article/archiveByMonth', {params});
        if (code === 200) {
            archiveList = {
                data,
                pageIndex,
                pageTotal
            };
        }
        return archiveList;
    },
    // 获取标签列表数据
    async getLabelList() {
        let labelList = [];
        let {code, data} = await axios.get('/api/label/getLabelList');
        if (code === 200) {
            labelList = data;
        }
        return labelList;
    },
    // 获取月份随记列表数据
    async getDiaryList(params) {
        let labelTotal = [];
        let {code, data} = await axios.get('/api/diary/getDiaryByMonth', {params});
        if (code === 200) {
            labelTotal = data;
        }
        return labelTotal;
    },
    // 增加文章阅读量
    async updateArticleHits(params) {
        await axios.post('/api/article/updateArticleHits', params);
    },
    // 获取文章详情数据
    async getArticleDetail(params) {
        let articleDetail = {};
        let {code, data} = await axios.get('/api/article/getArticleById', {params});
        if (code === 200) {
            articleDetail = data;
        }
        return articleDetail;
    },
    // 获取文章评论数据
    async getCommentList(params) {
        let commentList = [];
        let {code, data} = await axios.get('/api/comment/getCommentByArticleId', {params});
        if (code === 200) {
            commentList = data;
        }
        return commentList;
    }
};