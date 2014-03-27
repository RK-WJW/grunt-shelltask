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
        localWorkspace: "E://workspace/",
        "rs": {
          ip: "123.23.0.1",
          username: "wjw",
          password: "123",
          workspace: "/wjw"
        }
      },
      default_task: {
        options: {
          "rs1": {
            ip: "111.22.33.1",
            username: "wjw111",
            password: "111",
            workspace: "/wjw111"  
          }
        },
        task: [
          {
            command: 'hello default_task~!',
            remote: 'rs1'
          }
        ]
      },
      my_task: {
        options: {
          localWorkspace: "/home",
          "rs": {
            ip: "123.23.0.1",
            username: "wjw_",
            password: "123",
            workspace: "/wjw_"
          }
        },
        task: [
          {
            command: "hello my_task~!",
            remote: "rs"
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
