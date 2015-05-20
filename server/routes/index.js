/**
 *
 * ADvanSB -
 * Created By: scotty
 * Date: 19/05/2015 22:43
 *
 */
'use strict';
var router = require('koa-router')(),
    views = require('co-views'),
    render = views('./server/views', { map: { html: 'ejs' } });

module.exports = function(app) {

    // index route
    router.get('/', function *() {
        this.body = yield render('index.html', {
            siteName: 'ADvanSB',
            routes  : router.stack.routes
        });
    });

    // REST routes
    require('./packets')(app, router);

    return router;
};
