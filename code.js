/**
 * @class Utility
 * @description Utility class
 */
fm.Package("records");
fm.Class("Utility");
Utility = function (me) {
    this.setMe = function (_me) {
        me = _me;
    };

    this.shortHand = "Utility";
	
	/**
	 * get integer value
	 * @param {String} a
	 * @example [0] 0 "Expected result"
	 */
    Static.getInt = function (a) {
        if (a) {
            return parseInt(a, 10);
        }
        return 0;
    };
	
	/**
	* erwrrt ertttrtye
	*@param {String} a
	*@param {String} b
	*/
	this.getABCD = function(a,b){
	
	}

    /**
     * convert byte to ize
     * @param  {Long} bytes 
     * @example
     * 12 34 "343 3434"
     * @test 34 43 34 3434
     * @return {String}       
     */
    Static.bytesToSize = function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) return bytes + ' ' + sizes[i];
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };
};
