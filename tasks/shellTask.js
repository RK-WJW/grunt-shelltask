/*
 * grunt-shelltask
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
  grunt.registerMultiTask('shelltask', 'grunt exec shell task', function() {
    var task = this.data.task;
    var done = this.async();
    var options = this.options({
        log: path.join(__dirname, "../log/task.log")
    });

    async.mapSeries(task, function (item, callback){
      var remote = item.remote;
      var workPath = options.localWorkPath;
      var command = item.command;

      if(remote && options[remote]){
        var remoteObj = options[remote];
        var sshConn = sshArray[remote] || new ssh(remoteObj);
        workPath = remoteObj.workPath;
        if(sshConn){
          sshArray[remote] = sshConn;
          if(workPath){
            command = "cd " + workPath + "; " + command;
          }
          sshConn.exec(command, callback);
        }else{
          callback("ssh object error~!");
        }
      }else{
        localCmd.exec(command, workPath, callback);
      }
    }, function (err, data){
        if(err){
          throw grunt.util.error(err);
        }else{
          for(var i = 0; i < task.length; i++){
            var item = task[i];
            var str = (item.remote ? item.remote : "LOCAL") + ": " + item.command + "\n" + data[i];
            logger.info(str);
          }
        }
        done();
    });

  });
};
