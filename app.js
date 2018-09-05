const path = require('path');
const Koa = require('koa');
const render = require('koa-art-template');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const {router, getCommonData} = require('./router');

const app = new Koa();

app.use(bodyparser());
app.use(static(
    path.join(__dirname, './static')
));

render(app, {
    root: path.join(__dirname, 'view'),
    debug: false
});

app.use(router.routes()).use(router.allowedMethods());
app.use(async ctx => {
    if (ctx.status === 404) {
        let commonData = await getCommonData();
        await ctx.render('./404', {
            individuation: commonData.individuation,
            sideBar: commonData.sideBar,
        });
    }
});

app.listen(3000, () => {
    console.log('app is running...');
});