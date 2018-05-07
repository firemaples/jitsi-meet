package org.jitsi.meet;

import android.app.Application;

import com.facebook.soloader.SoLoader;

public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        if (BuildConfig.DEBUG) {
            StethoWrapper.initialize(this);
            StethoWrapper.addInterceptor();
        }

        SoLoader.init(this, /* native exopackage */ false);
    }
}
