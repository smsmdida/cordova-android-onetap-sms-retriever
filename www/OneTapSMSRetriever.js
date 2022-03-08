var exec = require('cordova/exec');
var PLUGIN_NAME = 'OneTapSMSRetriever';

/* Start the SMS Retriever API and listen for incoming SMS and callback 
registerSMSListner: function(successCallback, failureCallback) {
	exec(successCallback, failureCallback, 'OneTapSMSRetriever', 'REGISTER_OTP_SMS_LISTNER', [] );
};
*/
registerSMSListner: function(successCallback, errorCallback) {
        return new Promise(function(resolve, reject) {
            exec(function(message) {
                executeCallback(successCallback, message);
                resolve(message);
            }, function(message) {
                executeCallback(errorCallback, message);
                reject(message);
            }, PLUGIN_NAME, 'REGISTER_OTP_SMS_LISTNER', []);
        });
    },

/* Remove listner 
exports.unregisterSMSListner = function(successCallback, failureCallback) {
	exec(successCallback, failureCallback, 'OneTapSMSRetriever', 'UNREGISTER_OTP_SMS_LISTNER', [] );
};
*/
unregisterSMSListner: function(successCallback, errorCallback) {
        return new Promise(function(resolve, reject) {
            exec(function(message) {
                executeCallback(successCallback, message);
                resolve(message);
            }, function(message) {
                executeCallback(errorCallback, message);
                reject(message);
            }, PLUGIN_NAME, 'UNREGISTER_OTP_SMS_LISTNER', []);
        });
    },

module.exports = PLUGIN_NAME;	    
