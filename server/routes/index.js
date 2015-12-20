'use strict';
var router = require('koa-router')(),
    views = require('co-views'),
    render = views('./server/views', { map: { html: 'ejs' } });

module.exports = function(app, seneca) {

    // index route
    router.get('/', function *() {
        this.body = yield render('index.html', {
            siteName: 'ADvanSB',
            routes  : router.stack.routes
        });
    });

    // API routes
    require('./packets')(app, router, seneca);

    return router;
};
