const path = require('path');
const Koa = require('koa');
const render = require('koa-art-template');
const router = require('./router');
const static = require('koa-static');

const app = new Koa();

app.use(static(
    path.join(__dirname, './static')
));

render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});

app.use(router.routes()).use(router.allowedMethods());
app.use(async ctx => {
    if (ctx.status === 404) {
        await ctx.render('./404');
    }
});

app.listen(3000, () => {
    console.log('app is running...');
});