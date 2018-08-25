const path = require('path');
const Koa = require('koa');
const render = require('koa-art-template');
const router = require('./router');

const app = new Koa();

render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('app is running...');
});