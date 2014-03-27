var cmd = require('../tasks/lib/localCmd.js');

cmd.exec("cd", function (err,data){
	if(err){
		throw err;
	}else{
		console.log(data);
	}
});