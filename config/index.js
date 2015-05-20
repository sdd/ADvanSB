/**
 *
 * ADvanSB -
 * Created By: scotty
 * Date: 19/05/2015 19:15
 *
 * This config loader allows multiple nested configs that
 * inherit from a parent. The root config, all.js, is loaded
 * first. Then, for each item in a hyphen-separated NODE_ENV,
 * an extra config is merged in.
 *
 * E.g:
 *
 * NODE_ENV = dev: all.js, dev.js
 * NODE_ENV = test-unit: all.js, test.js, test-unit.js
 *
 */
'use strict';

var _ = require('lodash'),
    fs = require('fs');

var envs = (process.env.NODE_ENV || 'dev').split('-');

module.exports = _.reduce(envs,
    function(acc, env, idx, envs) {

        var nextLayer = envs.slice(0, idx + 1).join('-');

        try {
            acc = _.merge(acc, require(`./${nextLayer}`));
        } catch(e) {
            console.log(`Missing config file '${nextLayer}'`);
        }
        return acc;
    },
    require('./all')
);
