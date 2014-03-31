/**

问题：child_process.exec 执行命令返回中文显示乱码。
通过options参数设置encoding也不行，google了一下，有一个方法可以通过iconv-lite包转一下解决。
我想是不是有其他更好的方法解决的。可是一直找不到。。
*/
var exec = require('child_process').exec;
var iconv = require('iconv-lite');

function cmd(){
	this._exec = exec;
  this.logger = console;
  this.platform = process.platform,
  this.init();
  this.status = 0;
  this.chcp = 0;
  this.STATUS_MESSAGE = {
    "S0": {
      message: "连接尚未初始化完成"
    },
    "S1": {
      message: "连接初始化完成"
    },
    "S-1": {
      message: "初始化错误"
    },
  };
}

cmd.prototype = {
	constructor: cmd,
  init: function (){
    var self = this;
    if(self.platform === "win32"){
      self._exec("chcp", function (err, stdout, stderr){
        if(err || stderr){
          self.status = -1;
          self.STATUS_MESSAGE["S-1"].error = err || stderr;
        }else{
          var arr = stdout.match(/\d+/) || [];
          self.chcp = parseInt(arr[0]); 
          self.status = 1;
        }
      });
    }else{
      self.status = 1;
    }
  },
	exec: function (command, cwd, cb){
		var self = this;
    var args = Array.prototype.slice.call(arguments, 0);
    switch(self.status){
      case 0:
        setTimeout(function(){
          self.exec.apply(self, args);
        }, 1000);
        break;
      case 1: 
        _exec();
        break;
      default:
        cb(self.STATUS_MESSAGE["S" + self.status] || "未知错误");
    }

    function _exec(){
      var options = {
        encoding: self.chcp === 936 ? "binary" : 'utf8'
      };
      if(typeof cwd === 'function'){
        cb = cwd;
      }else{
        options.cwd = cwd;
      }
      self._exec(command, options,  function (error, stdout, stderr){
        if(error){
          cb(error);
        }else{
          var result = stdout || stderr;
          if(self.chcp === 936){
            result = iconv.decode(result, 'GBK');
          }
          cb(null, result);
        }
      });      
    }
	}
};

module.exports = new cmd();