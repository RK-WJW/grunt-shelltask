/*
 * grunt-shelltask
 * https://github.com/RK-WJW/grunt-shelltask
 *
 * Copyright (c) 2014 RK
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    shelltask: {
      options: {
        // localWorkPath: "E://workspace/",
        "rs": {
          host: "10.210.227.110",
          username: "wangqiang1",
          password: "123456",
          workPath: "/data1/nginx/htdocs/online"
        }
      },
      default_task: {
        options: {
          
        },
        task: [
          {
            command: 'pwd',
            remote: 'rs'
          },
          {
            command: "node test.js"
          },
          {
            command: function (){
              return "echo " + this.task[1].ret;
            }
          },
          {
            command: "dir"
          }
        ]
      }/*,
      my_task: {
        options: {
          localWorkPath: "E:/workspace/study/grunt/grunt-shelltask",
        },
        task: [
          {
            command: 'pwd',
            remote: 'rs'
          },
          {
            command: 'cd'
          },
          {
            command: 'dir'
          },
          {
            command: 'ls -l',
            remote: 'rs'
          }
        ]
      }*/
    }/*,

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }*/

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['shelltask']);

  // By default, lint and run all tests.
  // grunt.registerTask('default', ['jshint', 'test']);

};
