/*
 * grunt-shellTask
 * https://github.com/jiangwei/shellTask
 *
 * Copyright (c) 2014 RK-WJW
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    shellTask: {
      options: {
        localWorkPath: "E://workspace/",
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
            command: 'cd'
          }
        ]
      },
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
      }
    }/*,

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }*/

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'shellTask']);

  // By default, lint and run all tests.
  // grunt.registerTask('default', ['jshint', 'test']);

};
