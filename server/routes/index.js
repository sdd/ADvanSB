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

    // index
    router.get('/', function *() {

        console.log(JSON.stringify(router.stack.routes));

        this.body = yield render('index.html', {
            siteName: 'ADvanSB',
            /* helper: list of routes and methods */
            routes  : router.stack.routes
        });
    });

    require('./packets')(app, router);

    return router;
};
