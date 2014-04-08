
setTimeout(function(){

 console.log(fm.getMissingClass());
}, 1000);
global.GlobalStringMap = {doctor: "Doctor"};
 _id = 12;
 "use strict"
 require("jsfm");
 fm.Include("F:/practo/Public_html/js/vendor/dateformat.js");
var data = require('fs').readFileSync("./" + process.argv[2]).toString("utf-8");
data = JSON.parse(data);

fm.packages = data.sourceDirs || data.sourceDirs;
fm.Include("records.Settings");
 fm.Include(data.class, function() {
	console.log(data.methods);
	test(data);
 });
 


 function test(cases) {
    var fn;
	console.log("method", "parameters", "expected", "result", "status");
    fm.Include(cases.class, function(){
		var cls = fm.stringToObject(cases.class);
		var instance = new cls(), passedCount = 0, failedCount = 0;
		
		cases.methods.forEach(function(method){
			fn = null;
			if( method.methodType === 'static'){
				fn = cls[method.method];
			}else if(method.methodType === 'instance' || !method.methodType){
				fn = instance[method.method];
			}
			else {
				return;
			}
			method.tests.forEach(function(test){
				var result = fn.apply(cls, test.args);
				if(test.expected === result){
					passedCount++;
					//console.log(method.method, test.args, test.expected, result, "Pass");
				}else{
					failedCount++;
					console.error(method.method, test.args, test.expected, result, "Fail");
				}
			});
		});
		console.log("Total failed", failedCount);
		console.log("Total passed", passedCount);
    });
 }
