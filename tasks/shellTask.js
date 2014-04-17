/*
 * grunt-shelltask
 *
 * Copyright (c) 2014 RK
 * Licensed under the MIT license.
 */

'use strict';
var path = require("path");
var async = require('async');
var ssh = require('./lib/ssh.js');
var localCmd = require('./lib/localCmd.js');
var logger = console;
var sshArray = [];

module.exports = function (grunt) {
    grunt.registerMultiTask('shelltask', 'grunt exec shell task', function () {
        var task = this.data.task;
        var done = this.async();
        var options = this.options({
                // log: path.join(__dirname, "../log/task.log")
            });
        //按顺序执行
        async.mapSeries(task, function (item, callback) {
            var remote = item.remote;
            var workPath = options.localWorkPath;
            var command = item.command;
            var _cb = (function (item) {
                return function (err, data) {
                    item.ret = err || data;
                    data ? logger.info(data) : '';
                    callback(err, data);
                };
            })(item);

            if (typeof command === 'function') {
                command = command.apply({
                        "options" : options,
                        "task" : task
                    });
            }
            //命令为exit时终止任务
            if(command === "exit"){
                _cb("exit");
                return;
            }
            
            if (remote && options[remote]) {
                logger.info("REMOTE " + remote + ": " + command);
                var remoteObj = options[remote];
                var sshConn = sshArray[remote] || new ssh(remoteObj);
                workPath = remoteObj.workPath;
                if (sshConn) {
                    sshArray[remote] = sshConn;
                    if (workPath) {
                        command = "cd " + workPath + "; " + command;
                    }
                    sshConn.exec(command, _cb);
                } else {
                    _cb("ssh object error~!");
                }
            } else {
                logger.info("LOCAL: " + command);
                localCmd.exec(command, workPath, _cb);
            }
        }, function (err, data) {
            if (typeof err === "string") {
                logger.error("error: " + err);
            }else if(err){
                throw grunt.util.error(err);
            }
            done();
        });

    });
};
