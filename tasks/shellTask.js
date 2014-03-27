/*
 * grunt-shellTask
 * https://github.com/jiangwei/shellTask
 *
 * Copyright (c) 2014 RK-WJW
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var path = require("path");
  var async = require('async');

  grunt.registerMultiTask('shellTask', 'grunt exec shell task', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        log: path.join(__dirname, "../log/task.log")
    });
    // console.log(options);
    // console.log(this);

    var task = this.data.task;
    var str = '';
    for(var i = 0; i < task.length; i++){
      var item = task[i];
      if(item.remote && options[item.remote]){
        str += "cd " + options[item.remote].workspace + "\n";
      }
      str += item.command + "\n";
      str += "--------------\n"
    }
    grunt.log.writeln(str);
  });

};
