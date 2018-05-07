/*
 * Copyright @ 2017-present Atlassian Pty Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.jitsi.meet;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import org.jitsi.meet.sdk.JitsiMeetActivity;
import org.jitsi.meet.sdk.JitsiMeetView;
import org.jitsi.meet.sdk.JitsiMeetViewListener;

import java.util.Locale;
import java.util.Map;

/**
 * The one and only {@link android.app.Activity} that the Jitsi Meet app needs. The
 * {@code Activity} is launched in {@code singleTask} mode, so it will be
 * created upon application initialization and there will be a single instance
 * of it. Further attempts at launching the application once it was already
 * launched will result in {@link android.app.Activity#onNewIntent(Intent)} being called.
 * <p>
 * This {@code Activity} extends {@link JitsiMeetActivity} to keep the React
 * Native CLI working, since the latter always tries to launch an
 * {@code Activity} named {@code MainActivity} when doing
 * {@code react-native run-android}.
 */
public class MainActivity extends JitsiMeetActivity {
    @Override
    protected JitsiMeetView initializeView() {
        JitsiMeetView view = super.initializeView();

        // XXX In order to increase (1) awareness of API breakages and (2) API
        // coverage, utilize JitsiMeetViewListener in the Debug configuration of
        // the app.
        if (BuildConfig.DEBUG && view != null) {
            view.setListener(new JitsiMeetViewListener() {
                private void on(String name, Map<String, Object> data) {
                    // Log with the tag "ReactNative" in order to have the log
                    // visible in react-native log-android as well.
                    Log.d(
                            "ReactNative",
                            JitsiMeetViewListener.class.getSimpleName() + " "
                                    + name + " "
                                    + data);
                }

                @Override
                public void onConferenceFailed(Map<String, Object> data) {
                    on("CONFERENCE_FAILED", data);
                }

                @Override
                public void onConferenceJoined(Map<String, Object> data) {
                    on("CONFERENCE_JOINED", data);
                }

                @Override
                public void onConferenceLeft(Map<String, Object> data) {
                    on("CONFERENCE_LEFT", data);
                }

                @Override
                public void onConferenceWillJoin(Map<String, Object> data) {
                    on("CONFERENCE_WILL_JOIN", data);
                }

                @Override
                public void onConferenceWillLeave(Map<String, Object> data) {
                    on("CONFERENCE_WILL_LEAVE", data);
                }

                @Override
                public void onLoadConfigError(Map<String, Object> data) {
                    on("LOAD_CONFIG_ERROR", data);
                }
            });
        }

        return view;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // As this is the Jitsi Meet app (i.e. not the Jitsi Meet SDK), we do
        // want to enable some options.

        // The welcome page defaults to disabled in the SDK at the time of this
        // writing but it is clearer to be explicit about what we want anyway.
        setWelcomePageEnabled(false);

        super.onCreate(savedInstanceState);
    }

    @Override
    public void setContentView(View view) {
        super.setContentView(view);
        if (view instanceof JitsiMeetView) {
            String serverUrl = "https://meet.jit.si/";
            String roomName = "louistest777";

            String displayName = "Louis1Chen" + System.currentTimeMillis();
            String uid = "aayaqiv84n";

//            String photoUrl = "https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png";
            String photoUrl = null;

            Bundle bundle = new Bundle();

            if (!serverUrl.endsWith("/")) {
                serverUrl += "/";
            }
            bundle.putString("url", serverUrl + roomName);

            if (displayName != null) {
                bundle.putString("displayName", displayName);
            }

            if (photoUrl != null) {
                bundle.putString("avatarURL", photoUrl);
            } else {
                bundle.putString("avatarURL", getLetterAvatarUrl(uid, displayName));
            }

//                    bundle.putString("email", "test@test.com");


//            bundle.putString("url", "https://meet.jit.si/mytest1234");
//            bundle.putString("url", "https://meet.buddydo.us:7443/louistest");
//            bundle.putString("displayName", "MyName" + System.currentTimeMillis());
//            bundle.putString("email", "test@test.com");
//            bundle.putString("avatarURL", "https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png");

            ((JitsiMeetView) view).loadURLObject(bundle);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//      CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults);
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    private String FORMAT_LETTER_AVATAR = "letteravatar://%s/%s";

    private String getLetterAvatarUrl(String uid, String displayName) {
        return String.format(Locale.US, FORMAT_LETTER_AVATAR, uid, displayName);
    }
}
