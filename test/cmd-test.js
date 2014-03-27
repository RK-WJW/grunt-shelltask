var cmd = require('../tasks/lib/cmd.js');


/*host: '10.210.227.110',
port: 22,
username: 'wangqiang1',
password: '123456'*/
var ssh = new cmd('10.210.227.110', 22, 'wangqiang1', '123456');

ssh.exec("ls -l", function (err, data){
	if(err){
		throw err;
	}else{
		console.info(data);
	}
});