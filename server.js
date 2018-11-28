
const Koa = require('koa');
const conditional = require('koa-conditional-get');
const compress = require('koa-compress');
const kstatic = require('koa-static');
const etag = require('koa-etag');
const send = require('koa-send');

const server = new Koa();

server
  .use(compress())
  .use(conditional())
  .use(etag())
  .use(kstatic('dist/tools-angular'))
  .use((ctx) => send(ctx, 'dist/tools-angular/index.html'));

server.listen(process.env.PORT || 9001);
