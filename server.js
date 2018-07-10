
const Koa = require('koa');
const conditional = require('koa-conditional-get');
const compress = require('koa-compress');
const kstatic = require('koa-static');
const etag = require('koa-etag');

const server = new Koa();

server
  .use(compress())
  .use(conditional())
  .use(etag())
  .use(kstatic(__dirname + '/dist/tools-angular'));

server.listen(process.env.PORT || 9001);
