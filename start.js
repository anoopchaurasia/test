 var jsdoc = require("jsdoc");
 var k = jsdoc.run("D:/workspace/test/code.js");
for(var i in k ){
 if(k[i].comment != ''){
    console.log(JSON.stringify(k[i]) );
 }
}