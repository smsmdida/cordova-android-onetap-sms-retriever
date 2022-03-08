// Empty constructor
function OneTapSMSRetriever() {}

// The function that passes work along to native shells
// Message is a string, duration may be 'long' or 'short'
OneTapSMSRetriever.prototype.registerSMSListner = function(successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'OneTapSMSRetriever', 'REGISTER_OTP_SMS_LISTNER', [] );
}

OneTapSMSRetriever.prototype.unregisterSMSListner = function(successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'OneTapSMSRetriever', 'UNREGISTER_OTP_SMS_LISTNER', [] );
}


// Installation constructor that binds ToastyPlugin to window
OneTapSMSRetriever.install = function() {
  if (!window.plugins) {
    window.plugins = {};
  }
  window.plugins.OneTapSMSRetriever = new OneTapSMSRetriever();
  return window.plugins.OneTapSMSRetriever;
};
cordova.addConstructor(OneTapSMSRetriever.install);
