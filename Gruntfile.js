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
            //shelltask the top of the parameter
            //shelltask 顶端参数
            options : {
                //localWorkPath: Local command execution path
                //localWorkPath: 本地命令执行的路径
                localWorkPath: "E://workspace/",
                //"rs"为自定义值，用于配置远程机信息
                "rs" : {
                    host : "10.110.120.130",
                    username : "testname",
                    password : "123456",
                    //在远程机上执行命令时的当前环境路径
                    workPath : "/data1/nginx/htdocs/online"
                }
            },
            default_task : {
                options : {
                    //覆盖合并顶端参数
                },
                task : [{
                        command : 'cd'
                    }, {
                        id: "test1",//可选 标识当前配置的这条命令
                        command : "node test.js"
                    }, {
                        //command 支持方法Function方式，需要返回命令的字符串
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
                        //after 可选 Function 对命令得到的结果做再处理，返回处理后的结果
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
                            return "skip";//自定义命令 跳过当前命令
                        }
                    },{
                        command : "exit"//自定义命令 退出任务，不再往下执行
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
                        command : 'pwd',
                        remote : 'rs'
                    }
                ]
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    
    grunt.registerTask('test', ['shelltask']);

};
