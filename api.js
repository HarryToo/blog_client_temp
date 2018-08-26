const axios = require('axios');
axios.interceptors.request.use(res => {
    if (/^\/api\//.test(res.url)) {
        res.url = `https://www.doinblog.com${res.url}`;
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
    }
};