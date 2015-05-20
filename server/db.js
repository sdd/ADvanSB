'use strict';
var url = require('url'),
    monk = require('monk'),
    wrap = require('co-monk');

module.exports = function(config) {

    var uri = { protocol: 'mongodb', slashes: true, hostname: config.host, pathname: config.db };
    if (config.user) { uri.auth = `${config.user}:${uri.pass}`; }
    if (config.port) { uri.port = config.port; }

    var db = monk(url.format(uri));

    wrap(db.get('post')).find({}, err =>
        err ? console.error(`Could not connect to DB ${uri.db} (${err})`) : console.info('Connected to DB')
    );

    return db;
};
