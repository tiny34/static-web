/**
 * 
 */
var url = require('url');
var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

var config = require('./config');


function getType(filePath){
	var extname = path.extname(filePath);
	var re = config["source.type"+extname];
	if (!re) {
		re = "text/plain";
	}
	return re;
};
function getPath(req){
	
	var filePath = url.parse(req.url).pathname;
	filePath = decodeURIComponent(filePath);
	if(filePath=='/'){
		filePath = config['page.default'];
	}
	
	filePath = config.getPath(filePath);
	if(filePath.lastIndexOf("/") > filePath.lastIndexOf(".")){
		filePath = filePath + ".html";
	}
	
	if(!fs.existsSync(filePath)){
		filePath = config.getPath() + config['page.error.404'];
	}
	
	return filePath;
	
};
function error(){
	var path = config.getPath() + config['error.page.500'];
	fs.readFile(path, function (err, data) {
		if(err){
			res.send(500,config['error.message.500']);
		}else{
			res.set('content-type','text/html;charset=UTF-8');
			res.send(500,data);
		}
		
	});
};

app.get('*', function(req, res){
	
	var filePath = getPath(req);
	
	fs.readFile(filePath,function(err,data){
		if(err){
			error();
		}else{
			var type = getType(filePath);
			res.set('content-type',type + ';charset=UTF-8');
			res.send(data);
		}
	});
	
});

app.listen(config.getPort());
console.log('run on : http://localhost:'+config.getPort());
