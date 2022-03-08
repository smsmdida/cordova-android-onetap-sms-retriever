var oneTapSMSRetriever = {};

/* Start the SMS Retriever API and listen for incoming SMS and callback */
oneTapSMSRetriever.registerSMSListner = function(successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'oneTapSMSRetriever', 'REGISTER_OTP_SMS_LISTNER', [] );
};

/* Remove listner */
oneTapSMSRetriever.unregisterSMSListner = function(successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'oneTapSMSRetriever', 'UNREGISTER_OTP_SMS_LISTNER', [] );
};


module.exports = oneTapSMSRetriever;
