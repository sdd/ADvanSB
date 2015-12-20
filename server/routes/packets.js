'use strict';
var parse = require('co-body');

module.exports = function(app, router, seneca) {

    router.get('/state', function* stateGet() {
        const state = yield seneca.actAsync({
            system: 'ADSB',
            action: 'getState'
        });

        this.body = state ;
    });

    router.post('/packet', function* packetPost() {

        const authResult = yield seneca.actAsync({
            system: 'apiKey',
            action: 'validate',
            id: this.query.apiKey
        });

        if (!authResult.success) {
            this.status = 500;
            return;
        }

        if (!authResult.valid) {
            this.status= 401;
            return;
        }

        var packet = yield parse(this);

        packet.message.received = packet.received;

        const statePushResult = yield seneca.actAsync({
            system: 'ADSB',
            action: 'submitMessage',
            message: packet.message
        });

        if (!statePushResult.success) {
            this.status = 500;
        } else {
            this.status = 200;
        }
    });
};
