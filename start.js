
 "use strict"
 var jsdoc = require("jsdoc");
 require("jsfm");

fm.sourceDirs.records = "F:/practo/Public_html/js/ceb/classes";
fm.sourceDirs.calendar = "F:/practo/Public_html/js/calendar/src"

 var
log = function() {};

 var extractedData = {
     methods: []
 };

 fm.Include('records.Utility', function() {

    var k = jsdoc.run(fm.getPath("records.Utility"));
    for (var i in k) {
         handle(k[i]);
     }
     extractedData.class = fm.stringToObject(k[0].longname).toString();
     test(extractedData);
 });

 function handle(data) {
     if (data.kind !== 'function') {
         return;
     }
     var methodTests = {
         tests: []
     };
     methodTests.method = data.name;
     methodTests.methodType = data.memberof == "Static" ? 'static' : "instance";
     if (data.tags) {
         for (var i = 0; i < data.tags.length; i++) {
             var test = JSON.parse(data.tags[i].text);
             methodTests.tests.push({
                 args: test.args,
                 expected: test.expected
             });
         };
     }
     extractedData.methods.push(methodTests);
 }
setTimeout(function(){

 console.log(fm.getMissingClass());
}, 1000);

 function test(cases) {
    var fn;
    fm.Include(cases.class, function(){
        //setTimeout(function(){
            var cls = fm.stringToObject(cases.class);
            var instance = new cls();
            cases.methods.forEach(function(method){
                fn = null;
                if( method.methodType === 'static'){
                    fn = cls[method.method];
                }else if(method.methodType === 'instance'){
                    fn = instance[method.method];
                }
                else {
                    return;
                }
                method.tests.forEach(function(test){
                    var result = fn.apply(cls, test.args);
                    if(test.expected === result){
                        console.log(method.method, test.args, test.expected, result, "Pass");
                    }else{
                         console.error(method.method, test.args, test.expected, result, "Fail");
                    }
                });
            });
       // }, 1000);
    });
 }
