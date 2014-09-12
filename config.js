var configJson = require('./config.json');

var config = {
	
	"page.default":"/sys/hello.html",
	"page.error.500":"/sys/500.html",
	"page.error.404":"/sys/404.html",

	"error.message.404":"页面不存在不存在",
	"error.message.500":"服务器发生错误了",
	
	"source.type.css" : "text/css",
	"source.type.gif" : "image/gif",
	"source.type.html" : "text/html",
	"source.type.ico" : "image/x-icon",
	"source.type.jpeg" : "image/jpeg",
	"source.type.jpg" : "image/jpeg",
	"source.type.js" : "text/javascript",
	"source.type.json" : "application/json",
	"source.type.pdf" : "application/pdf",
	"source.type.png" : "image/png",
	"source.type.svg" : "image/svg+xml",
	"source.type.swf" : "application/x-shockwave-flash",
	"source.type.tiff" : "image/tiff",
	"source.type.txt" : "text/plain",
	"source.type.wav" : "audio/x-wav",
	"source.type.wma" : "audio/x-ms-wma",
	"source.type.wmv" : "video/x-ms-wmv",
	"source.type.xml" : "text/xml",
	
	getPath : function(data){
		var webPath = configJson['project.path'];
		var extendPath = "";
		
		if(data === 500){
			extendPath = this["page.error.500"];
		}else if(data === 400){
			extendPath = this["page.error.400"];
		}else if(typeof data !="undefined"){
			extendPath = data + "";
		}
		
		return webPath+extendPath;
	},
	getPort : function(){
		return configJson['project.port'];
	}
};

module.exports = config;