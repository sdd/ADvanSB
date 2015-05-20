"use strict";

module.exports = function(app, router) {

    var db = require('../db')(app.config.db);
    var Packet = require('../models/packet')(db);

    router.get('/packets', function *() {
        this.body = yield Packet.find({}).limit(10);
    });
};
