var redis = require("redis");
var client  = redis.createClient('6379', '127.0.0.1');
client.set('foo','bar',function(){
	client.get('foo',function(error, fooValue){
		console.log(fooValue);
});
});
