function OneTapSMSRetriever() {
  
}

/* Start the SMS Retriever API and listen for incoming SMS and callback */

OneTapSMSRetriever.prototype.registerSMSListner = function(successCallback, failureCallback) {
	exec(successCallback, failureCallback, 'OneTapSMSRetriever', 'REGISTER_OTP_SMS_LISTNER', [] );
};
/* Remove listner */

OneTapSMSRetriever.prototype.unregisterSMSListner = function(successCallback, failureCallback) {
	exec(successCallback, failureCallback, 'OneTapSMSRetriever', 'UNREGISTER_OTP_SMS_LISTNER', [] );
};

OneTapSMSRetriever.install = function () {
  if (!window.plugins) {
	window.plugins = {};
  }

  window.plugins.OneTapSMSRetriever = new OneTapSMSRetriever();
  return window.plugins.OneTapSMSRetriever;
};

cordova.addConstructor(OneTapSMSRetriever.install);

