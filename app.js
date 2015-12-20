'use strict';

var app = require('koa')();

app.use(require('koa-logger')());
const config = app.config = require('./config');
app.keys = app.config.keys;

app.use(require('./server/middleware')(app));

const seneca = require('seneca')();
seneca.use('seneca-bluebird');

const apiKey = require('alt-apikey-seneca/alt-apikey-seneca')(config.apiKey, seneca);
const integrator = require('adsb-message-integrator')(config, seneca);

var router = require('./server/routes')(app, seneca);
app.use(router.routes());
app.use(router.allowedMethods());

app.use(require('./server/errors'));

app.listen(app.config.port);
console.log(`Application started on port ${app.config.port}`);
