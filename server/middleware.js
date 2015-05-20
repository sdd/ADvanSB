/**
 *
 * ADvanSB -
 * Created By: scotty
 * Date: 19/05/2015 21:54
 *
 */
'use strict';
var compose = require('koa-compose'),
    session = require('koa-session'),
    jsonp = require('koa-jsonp'),
    serve = require('koa-static'),
    lusca = require('koa-lusca');

module.exports = function(app) {
    return compose([
        lusca(),
        session(app),
        jsonp(),
        serve(app.config.publicFolder)
    ]);
};
