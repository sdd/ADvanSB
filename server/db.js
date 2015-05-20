'use strict';
var monk = require('monk'),
    wrap = require('co-monk');

module.exports = function(config) {

    var uristring = ['mongodb://'];
    if (config.user.length) { uristring.push(`${config.user}:${config.pass}@`); }
    uristring.push(config.host);
    if (config.port) { uristring.push(`:${config.port}`) }
    uristring.push(`/${config.db}`);

    var db = monk(uristring.join());

    wrap(db.get('post')).find({}, err =>
        err ? console.error(`Could not connect to DB ${uristring} (${err})`) : console.info('Connected to DB')
    );

    return db;
};
