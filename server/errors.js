'use strict';
var compose = require('koa-compose'),
    views = require('co-views');
var render = views('./server/views', { map: { html: 'ejs' } });

module.exports = compose([

    // 500 Errors
    function *(next) {
        try {
            yield next;
        } catch (err) {
            this.status = 500;
            this.body = err.message;
            this.app.emit('error', err, this);
        }
    },

    // 404 Errors
    function *() {
        let err = new Error();
        this.status = 404;
        //this.body = yield render('404.html', { errors: err });
    }
]);
