# grunt-shelltask

> grunt插件，通过配置执行本地以及远程的一系列命令，完成自动化任务处理。

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

1.  在cmd窗口输入执行：chcp 65001
2.  右击cmd窗口左上角，选择属性-->字体-->Lucida Console 然后确定    


## The "shelltask" task

### Overview
In your project's Gruntfile, add a section named `shelltask` to the data object passed into `grunt.initConfig()`.   
在你项目的Gruntfile文件中,添加`shelltask`属性配置到`grunt.initConfig()`中。  
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
      options:{

      },
      task: [
        {
          id: 'test001',//optional
          command: 'pwd',//String or Function
          remote: 'remoteName' //optional 若指定将在该指定的远程机上执行当前这条命令
          after: function(data){return data;} //Function 对得到的结果再处理 
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
任务所需的参数配置

#### options.localWorkPath
Type: `String`    
本地命令执行的路径，若配置，将在指定的路径下执行，若不指定，默认执行grunt命令的所在路径

#### options.remoteName (*remoteName user-defined*)
Type: `Object`  
配置远程服务器信息，配置命令时，可以指定在哪台远程机上执行。

-   Object.host: IP地址
-   Object.port: 端口，默认22
-   Object.username: 用户名
-   Object.password: 密码
-   Object.workPath: 指定命令执行的路径，不指定默认链接的用户路径

### Task
需要执行的一系列命令数组    
item:

-   id: [String] 可选，用于唯一标示当前配置的这一条命令
-   command: [String/Function] 需要执行的命令，支持通过Function形式返回命令字符串
-   remote: [String] 可选 命令需要在远程机上执行时，需指定
-   after: [Function] 可选 对命令得到的结果再处理

#### command
1.  String 
    -   可通过`[%= optionName %]`形式获取options中配置的参数
    -   程序中定义的命令: `exit` 退出当前任务，`skip` 跳过当前命令 
2.  Function
    -   执行该方法的this：
        -   options 当前任务使用的参数
        -   task 当前的任务数组，已执行的会新增ret属性，值为命令执行的结果
        -   getResult 获取指定命令的结果，参数命令的id或者在task中的index
        -   prev 前一个命令对象
    -   参数prev：等于this.prev

#### after
Function 可选配置 返回处理后的结果

-   参数data：当前命令执行的结果字符串
-   执行该方法的this同上

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
