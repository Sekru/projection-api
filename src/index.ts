import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';

import GeojsonService from './geojsonService';

const app = new Koa();
const router = new Router();

const geojsonService = new GeojsonService();

router.post('/convert', async (ctx, next) => {
    ctx.body = geojsonService.handle(ctx.request.body, ctx.request.headers);
    await next();
});

app.use(json());
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000);