/**
 *
 * ADvanSB -
 * Created By: scotty
 * Date: 19/05/2015 20:36
 *
 */
'use strict';

var app = require('koa')();

app.use(require('koa-logger')());
app.config = require('./config');
app.keys = app.config.keys;

app.use(require('./server/middleware')(app));

var router = require('./server/routes')(app);
app.use(router.routes());
app.use(router.allowedMethods());

app.use(require('./server/errors'));

app.listen(app.config.port);
console.log(`Application started on port ${app.config.port}`);
