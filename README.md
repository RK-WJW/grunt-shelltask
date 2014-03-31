# grunt-shelltask

> grunt exec shell task

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

#win系统需要修改cmd窗口编码和字体，不然可能会出现乱码。#   
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
          command: function (){
            /*
            this 当前任务数组对象，item：{
              command: '', //命令
              remote: '', //远程名
              ret: '' //执行命令的结果
            }
            */
            return "echo " + this.task[1].ret;
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
      task: [
        {
          command: 'pwd',
          remote: 'rs'
        },{
          command: 'cd'
        },{
          command: function (){
            var _cmd = "echo " + this.task[0].ret + " ; " + this.task[1].ret; 
            return _cmd;
          }
        }
      ]
    }
  }
});
// result
// REMOTE rs: pwd
// /home/test/
// LOCAL: cd
// E:/workspace/
// LOCAL: echo /home/test/ ; E:/workspace/
// /home/test/ ; E:/workspace/
```

## Release History
_(Nothing yet)_
