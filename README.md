# grunt-shellTask

> grunt exec shell task

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-shellTask --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-shellTask');
```

## The "shellTask" task

### Overview
In your project's Gruntfile, add a section named `shellTask` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  shellTask: {
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
  shellTask: {
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
        }
      ]
    }
  }
});
// result
// 123.1.1.10: pwd
// /home/test/
// local: cd
// E:/workspace/
```

## Release History
_(Nothing yet)_
