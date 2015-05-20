/**
 *
 * ADvanSB -
 * Created By: scotty
 * Date: 19/05/2015 23:47
 *
 */
'use strict';
var monk = require('monk'),
    wrap = require('co-monk');

module.exports = function(config) {
    var port = (config.port.length > 0) ? ':' + config.port : '';
    var login = (config.user.length > 0) ? config.user + ':' + config.pw + '@' : '';
    var uristring = 'mongodb://' + login + config.host + port + '/' + config.db;

    var db = monk(uristring);

    // validate the connection. No easy way :(
    var test = wrap(db.get('post'));
    test.find({}, function(err) {
        if (err) {
            console.log('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log('Successfully connected to: ' + uristring);
        }
    });

    return db;
};
