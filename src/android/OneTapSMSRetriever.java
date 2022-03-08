package com.smsmdida.onetapsmsretriever;

import android.Manifest;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;

import com.google.android.gms.auth.api.phone.SmsRetriever;
import com.google.android.gms.auth.api.phone.SmsRetrieverClient;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.common.api.Status;

public class OneTapSMSRetriever extends CordovaPlugin {

	private CallbackContext callbackContext;
	private SmsRetrieverClient smsRetrieverClient;
	BroadcastReceiver broadcastReceiver = null;

	private static final String TAG = "cordova-android-one-tap-sms-retriever";
	private static final String REGISTER_OTP_SMS_LISTNER = "REGISTER_OTP_SMS_LISTNER";
	private static final String UNREGISTER_OTP_SMS_LISTNER = "UNREGISTER_OTP_SMS_LISTNER";
    private static final int SMS_CONSENT_REQUEST = 2;

	/**
	* @param cordova The context of the main Activity.
	* @param webView The CordovaWebView Cordova is running in.
	*/
	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		Log.d(TAG, "initialize");
		super.initialize(cordova, webView);

		// Get an instance of SmsRetrieverClient, used to start listening for a matching SMS message.
		smsRetrieverClient = SmsRetriever.getClient(cordova.getActivity().getApplicationContext());
	}

	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		PluginResult result = null;
		this.callbackContext = callbackContext;
		if (action.equals(REGISTER_OTP_SMS_LISTNER)) {
			this.registerBroadcastReceiver();
		} else if (action.equals(UNREGISTER_OTP_SMS_LISTNER)){
			this.unRegisterBroadcastReceiver();
		} else {
			Log.d(TAG, String.format("Invalid action passed: %s", action));
			result = new PluginResult(PluginResult.Status.INVALID_ACTION);
			callbackContext.sendPluginResult(result);
		}
		return true;
	}

	public void onDestroy() {
		this.unRegisterBroadcastReceiver();
	}

	public void unRegisterBroadcastReceiver() {
		if (this.broadcastReceiver != null) {
			try {
				cordova.getActivity().getApplicationContext().unregisterReceiver(this.broadcastReceiver);
				this.broadcastReceiver = null;
				Log.d(TAG, "SMS Retriever unregistered successfully");
			} catch (Exception e) {
				Log.e(TAG, "Error unregistering network receiver: " + e.getMessage());
			}
		}
	}

    public void registerBroadcastReceiver(){
        if(this.broadcastReceiver == null){
            this.broadcastReceiver = new BroadcastReceiver() {

                @Override
                public void onReceive(Context context, Intent intent) {
                    if(SmsRetriever.SMS_RETRIEVED_ACTION.equals(intent.getAction())){
                        Bundle extras = intent.getExtras();
                        Status status = (Status) extras.get(SmsRetriever.EXTRA_STATUS);
                        switch(status.getStatusCode()) {
                            case CommonStatusCodes.SUCCESS:
                                Intent consentIntent = extras.getParcelable(SmsRetriever.EXTRA_CONSENT_INTENT);
                                try {
                                    cordova.getActivity().getApplicationContext().startActivityForResult(consentIntent, SMS_CONSENT_REQUEST, null);
                                } catch (ActivityNotFoundException e) {
                                    // Handle the exception ...
                                }
                                break;
                            case CommonStatusCodes.TIMEOUT:
                                break;
                        }

                    }
                }
            };
            IntentFilter intentFilter = new IntentFilter(SmsRetriever.SMS_RETRIEVED_ACTION);
            reactContext.registerReceiver(this.broadcastReceiver, intentFilter, SmsRetriever.SEND_PERMISSION, null);

            smsRetrieverClient.startSmsUserConsent(null);

        }
    }

	@Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
        case SMS_CONSENT_REQUEST:
            if (resultCode == RESULT_OK) {
                String message = data.getStringExtra(SmsRetriever.EXTRA_SMS_MESSAGE);
				PluginResult result = new PluginResult(PluginResult.Status.OK, message);
				callbackContext.sendPluginResult(result);
            }
            break;
        }
    }
}