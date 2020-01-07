import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import { createReadStream } from 'fs';

import GeojsonService from './geojsonService';

const app = new Koa();
const router = new Router();

const geojsonService = new GeojsonService();

router.post('/convert', async (ctx, next) => {
    ctx.body = geojsonService.handle(ctx.request.body, ctx.request.query);
    await next();
});

router.get('/', async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = createReadStream(`${__dirname}/../public/index.html`);
});

app.use(json());
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000);