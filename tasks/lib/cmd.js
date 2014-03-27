/**
 * @description 
 * @author
 */

var Connection = require('ssh2');

function ssh(host, port, username, password){
  this.host = host;
  this.port = port || 22;
  this.username = username;
  this.password = password;
  this.connection = null;
  this.status = 0;
  this.init();
}

ssh.prototype = {
  constructor: ssh,
  init: function (){
    var self = this;
    if(self.host && self.username){
      var c = self.connection = new Connection();
      c.on("ready", function (){
        console.info("Connection ready~! ");
        self.status = 1;
      });
      c.on('error', function(err) {
        console.error('Connection error~! ' + err);
        self.status = -1;
      });
      c.on('end', function() {
        console.log('Connection end~! ');
        self.status = 2;
      });
      c.on('close', function(had_error) {
          console.log('Connection close~! ');
          self.status = 3;
      });
      c.connect({
          host: self.host,
          port: self.port,
          username: self.username,
          password: self.password
      });
    }else{
      throw "缺少参数~！";
    }
  },
  exec: function (command, cb){
    var self = this;
    if(self.status === 1){
      self.connection.exec(command, function (err, stream){
        if(err){
          cb(err);
        }else{
          var dataStr = '';
          stream.on('data', function(data, extended) {
            dataStr += data;
            // console.info((extended === 'stderr' ? 'STDERR: ' : 'STDOUT: ') + data);
          });
          stream.on('end', function() {
            cb(null, dataStr);
            console.info('Stream: end~!');
          });
          stream.on('exit', function(code, signal) {
            // console.info('Stream: exit, code: ' + code + ', signal: ' + signal);
          });
          stream.on('close', function() {
            // console.info('Stream: close~!');
          });    
        }
      });
    }else{
      // console.info("ssh init ...");
      setTimeout(function(){
        self.exec(command, cb);
      }, 1000);
    }
  }
};

module.exports = ssh;