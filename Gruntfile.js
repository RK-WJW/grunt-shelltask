/*
 * grunt-shelltask
 * https://github.com/RK-WJW/grunt-shelltask
 *
 * Copyright (c) 2014 RK
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        shelltask : {
            options : {
                // localWorkPath: "E://workspace/",
                "rs" : {
                    host : "10.110.120.130",
                    username : "testname",
                    password : "123456",
                    workPath : "/data1/nginx/htdocs/online"
                }
            },
            default_task : {
                options : {},
                task : [{
                        command : 'cd'
                    }, {
                        id: "test1",
                        command : "node test.js"
                    }, {
                        command : function (prev) {
                            var self = this;
                            /*
                            this: {
                                options: 任务配置参数options
                                task: 任务数组
                                getResult: 获取已执行的某个任务的结果
                                prev: 前一个任务对象
                            }
                            */
                            console.info(prev);
                            console.info("node test.js result: " + self.getResult(1));
                            console.info("node test.js result: " + self.getResult('test1'));
                            console.info("cd result: " + self.getResult());//default 0
                            return "echo " + this.task[1].ret;
                        },
                        after : function (data) {
                            //this 同上
                            return {
                                "data" : data,
                                "status": 1
                            };

                        }
                    },{
                        command: function (prev){
                            var ret = prev.ret;
                            console.info(ret.status);//1
                            return "skip"
                        }
                    },{
                        command : "exit"
                    }, {
                        command : "dir"
                    }
                ]
            },
            my_task : {
                options : {
                    // localWorkPath : "E:/workspace/study/grunt/grunt-shelltask",
                },
                task : [{
                        command : 'cd'
                    }, {
                        command : 'exit'
                    }, {
                        command : 'ls -l',
                        remote : 'rs'
                    }
                ]
            }
        }
        /*,

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
