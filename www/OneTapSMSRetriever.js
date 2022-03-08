var oneTapSMSRetriever = {};

/* Start the SMS Retriever API and listen for incoming SMS + trigger onSMSArrive event when valid SMS arrives */
oneTapSMSRetriever.registerSMSListner = function(successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'OneTapSMSRetriever', 'REGISTER_OTP_SMS_LISTNER', [] );
};

/* Get the SMS Retriever API app's hash string */
oneTapSMSRetriever.unregisterSMSListner = function(successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'OneTapSMSRetriever', 'UNREGISTER_OTP_SMS_LISTNER', [] );
};


module.exports = oneTapSMSRetriever;