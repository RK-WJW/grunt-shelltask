/**

*/
var exec = require('child_process').exec;

function cmd(){
	this._exec = exec;
  this.logger = console;
}

cmd.prototype = {
	constructor: cmd,
	exec: function (command, cb){
		var self = this;
    self._exec(command, function (error, stdout, stderr){
      if(error){
        cb(error);
      }else{
        cb(null, stdout || stderr);
      }
    });
	}
};

module.exports = new cmd();