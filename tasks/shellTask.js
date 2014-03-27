/*
 * grunt-shellTask
 * https://github.com/jiangwei/shellTask
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
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('shellTask', 'grunt exec shell task', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        log: path.join(__dirname, "../log/task.log")
    });
    // console.log(options);
    // console.log(this);

    var task = this.data.task;
    async.eachSeries(task, function (item, callback){
      if(item.remote && options[item.remote]){
        var remote = item.remote;
        var sshConn = sshArray[remote] || new ssh(options[remote]);
        if(sshConn && sshConn.status === 1){
          sshArray[remote] = sshConn;
          sshConn.exec(item.command, callback);
        }else{
          logger.error("ssh error~!");
          callback("ssh error~!");
        }
      }else{
        localCmd.exec(item.command, callback);
      }
    }, function (err, data){
      
    });
  });

};
