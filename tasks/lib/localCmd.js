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
}

cmd.prototype = {
	constructor: cmd,
	exec: function (command, cwd, cb){
		var self = this;
    var options = {
      encoding: "binary"
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
        var str = iconv.decode(stdout || stderr, 'GBK');
        cb(null, str);
      }
    });
	}
};

module.exports = new cmd();