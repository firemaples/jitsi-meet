package org.jitsi.meet.bridge;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@SuppressWarnings("unused")
@ReactModule(name = NativeBridge.NAME)
public class NativeBridge extends ReactContextBaseJavaModule {
    static final String NAME = "NativeBridge";

    public NativeBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getUserPhoto(String did, String tid, String uid, Promise promise) {
        promise.resolve("https://www.buddydo.com/t3/MjUyMQ08d6_T.jpg");
    }
}
