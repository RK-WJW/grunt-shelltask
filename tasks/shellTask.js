/*
 * grunt-shellTask
 *
 * Copyright (c) 2014 RK-WJW
 * Licensed under the MIT license.
 */

'use strict';
var path = require("path");
var async = require('async');
var ssh = require('./lib/ssh.js');
var localCmd = require('./lib/localCmd.js');
var logger = console;
var sshArray = [];

module.exports = function(grunt) {
  grunt.registerMultiTask('shellTask', 'grunt exec shell task', function() {
    var task = this.data.task;
    var done = this.async();
    var options = this.options({
        log: path.join(__dirname, "../log/task.log")
    });

    async.eachSeries(task, function (item, callback){
      var remote = item.remote;
      var workPath = options.localWorkPath;
      var command = item.command;
      var _callback = function (err, data){
        logger.info(err||data);
        callback(err, data);
      }
      if(remote && options[remote]){
        var remoteObj = options[remote];
        var sshConn = sshArray[remote] || new ssh(remoteObj);
        workPath = remoteObj.workPath;
        if(sshConn){
          sshArray[remote] = sshConn;
          logger.info(sshConn.host + ": " + item.command);
          if(workPath){
            command = "cd " + workPath + "; " + command;
          }
          sshConn.exec(command, _callback);
        }else{
          _callback("ssh object error~!");
        }
      }else{
        logger.info("local: " + item.command);
        localCmd.exec(command, workPath, _callback);
      }
    }, function (err, data){
        if(err){
          throw grunt.util.error(err);
        }else{
          logger.info(arguments);
        }
        done();
    });

  });
};
