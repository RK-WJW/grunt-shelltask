# grunt-shelltask

> grunt插件，配置实现自动执行本地或远程的多命令任务处理。

## Getting Started
This plugin requires Grunt `*`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-shelltask --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-shelltask');
```

**win系统如果出现有乱码情况，可尝试修改cmd窗口编码和字体，具体如下**      
设置方法：    
1、在cmd窗口输入执行：chcp 65001
2、右击cmd窗口左上角，选择属性-->字体-->Lucida Console 然后确定    


## The "shelltask" task

### Overview
In your project's Gruntfile, add a section named `shelltask` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  shelltask: {
    options: {
      // Task-specific options go here.
      localWorkPath: '', 
      "remoteName": {
        host: '',
        port: 22,
        username: '',
        password: '',
        workPath: ''
      }
    },
    my_task: {
      // Target-specific file lists and/or options go here.
      options:{

      },
      task: [
        {
          command: 'pwd',
          remote: 'remoteName'
        },{
          command: 'cd'
        },{
          command: 'skip' //custom command：Continue to the next
        },{
          command: 'exit' //custom command：No longer continue to execute down
        },{
          command: function (prev){
            /*
            this {
              options: '', 
              task: [],
              getResult: Function,//by id, by index
              prev: task[n-1]
            }
            prev == this.prev
            */
            return "echo " + this.task[1].ret;
          },
          after: function (data){
            //data：command result string
            //this same as above
            return data;
          }
        }
      ]
    },
    my_task2: {
      //...
    }
  },
});
```

### Options

#### options.localWorkPath
Type: `String`
Default value: 

#### options.remoteName (*remoteName user-defined*)
Type: `Object`
Default value: 


### Usage Examples

#### Default Options
In this example

```js
grunt.initConfig({
  shelltask: {
    options: {
      localWorkPath: 'E:/workspace/', 
      "rs": {
        host: '123.1.1.10',
        port: 22,
        username: 'test',
        password: '123456',
        workPath: '/home/test/'
      }
    },
    my_task: {
      options:{
      
      },
      task: [
        {
          command: 'pwd',
          remote: 'rs'
        },{
          id: 'cdTest',
          command: 'cd',
          after: function (data){
            return {path: data};
          }
        },{
          command: function (prev){
            var _cmd = "echo " + prev.ret.path; 
            return _cmd;
          }
        },{
          command: function (){
            var ret = this.getResult("cdTest");//get result by task id
            var ret1 = this.getResult(1);//get result by task index
            var ret2 = this.getResult();//default 0
            var options = this.options; //options
            console.log(ret.path === ret1.path);//true
            console.log(ret2);// /home/test/
            return "skip";
          }
        },{
          command: "exit"
        },{
          command: "cd"//not execute
        }
      ]
    }
  }
});
```

## Release History
_(Nothing yet)_
