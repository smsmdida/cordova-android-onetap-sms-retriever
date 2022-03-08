var exec = require('cordova/exec');

/* Start the SMS Retriever API and listen for incoming SMS and callback */
exports.registerSMSListner = function(successCallback, failureCallback) {
	exec(successCallback, failureCallback, 'OneTapSMSRetriever', 'REGISTER_OTP_SMS_LISTNER', [] );
};

/* Remove listner */
exports.unregisterSMSListner = function(successCallback, failureCallback) {
	exec(successCallback, failureCallback, 'OneTapSMSRetriever', 'UNREGISTER_OTP_SMS_LISTNER', [] );
};
