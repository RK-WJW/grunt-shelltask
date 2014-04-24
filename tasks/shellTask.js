/*
 * grunt-shelltask
 *
 * Copyright (c) 2014 RK
 * Licensed under the MIT license.
 */

'use strict';
var sheller = require('sheller');
var logger = sheller.logger;

module.exports = function (grunt) {
    grunt.registerMultiTask('shelltask', 'grunt exec shell task', function () {
        var task = this.data.task;
        var done = this.async();
        var options = this.options({
                // logger: logger
            });
        sheller.execTask({
            "options": options,
            "task": task
        }, function (err, data){
            if (typeof err === "string") {
                logger.error("error: " + err);
            }else if(err){
                throw grunt.util.error(err);
            }
            done();
        });
    });
};
