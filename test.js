
setTimeout(function(){

 console.log(fm.getMissingClass());
}, 1000);
global.GlobalStringMap = {doctor: "Doctor"};
global. GlobalSession = {};
global.$ = {
	each:function(arr, cb){
		arr.forEach(function(data, index){
			cb.call(data, index);
		});
	}
};
 _id = 12;
 "use strict"
 require("jsfm");
 fm.Include("F:/practo/Public_html/js/vendor/dateformat.js");
 fm.Include("F:/practo/Public_html/js/vendor/date.js");
 fm.Include("F:/practo/Public_html/js/vendor/parser.js");
var testCeses = require('fs').readFileSync("./" + process.argv[2]).toString("utf-8");
testCeses = JSON.parse(testCeses);
fm.packages = testCeses.sourceDirs || testCeses.sourceDirs;
fm.Include("records.Utility");
fm.Include("calendar.serverCompatible");
fm.Include("calendar.Server");
fm.Include("records.Settings");

fm.Include("records.DateClass");
 fm.Include(testCeses.class, function() {
	var data = require("fs").readFileSync("./data/settings.json").toString("utf-8");
	data = JSON.parse(data);
	DoctorList.set(data.doctors);
	Settings.set(data);
	test(testCeses);
 });
 


 function test(cases) {
    var fn;
	console.log("method", "parameters", "expected", "result", "status");
    fm.Include(cases.class, function(){
		var cls = fm.stringToObject(cases.class);
		var argv = cases.args;
		var instance = new cls(argv[0], argv[1], argv[2], argv[3], argv[4], argv[5]), passedCount = 0, failedCount = 0;
		for(var key in cases.instance){
		   if( cases.instance[key] === instance[key]){
				passedCount++;
				//console.log(method.method, test.args, test.expected, result, "Pass");
			}else{
				failedCount++;
				console.error(key, "prop", instance[key], cases.instance[key], "Fail");
			}
		}
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
