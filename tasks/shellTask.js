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
                logger: logger
            });
        //用于外部使用提供的对象
        var obj = {
            "options" : options,
            "task" : task,
            "getResult": function (id){
                id = id || 0;
                if(typeof id === 'number'){
                    return task[id].ret;
                }
                for(var i = 0; i < task.length; i++){
                    var item = task[i];
                    if(id == item.id){
                        return item.ret;
                    }
                }
            },
            "prev": null
        };
        //按顺序执行
        async.mapSeries(task, function (item, callback) {
            var remote = item.remote;
            var workPath = options.localWorkPath;
            var command = item.command;
            var after = item.after;
            
            var _cb = (function (item) {
                return function (err, data) {
                    var ret = data;
                    if(err){
                        item.error = err;
                        callback(err, data);
                    }
                    if(typeof after === 'function'){
                        ret = after.apply(obj, [data]);
                    }
                    item.ret = ret;
                    obj.prev = item;
                    callback(null, ret);
                };
            })(item);

            if (typeof command === 'function') {
                command = command.apply(obj, [obj.prev]);
            }
            command = command.replace(/\[(%=\s?[^%]*\s?%)\]/g, "<$1>");
            command = grunt.template.process(command, {data: options});
            //命令为exit时终止任务
            if(command === "exit"){
                _cb("exit");
                return;
            }
            //命令为skip时跳过任务
            if(command === "skip"){
                _cb(null, "skip");
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
