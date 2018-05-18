// @flow
import { NativeModules } from 'react-native';

import { defaultImage } from './constraint';

import { parseCustomAvatarIDInfo } from './functions';

// import { _updateProfile } from './actions'

const avatarURLCache = {};

/**
 * Retrieve user photo from native.
 *
 * @param {string} customAvatarID - The custom avatarID.
 * @returns {string} - The avatarURL for user.
 */
export function generateUserPhoto(customAvatarID: string) {
    console.log(`generateUserPhoto: ${customAvatarID}`);

    if (avatarURLCache[customAvatarID]) {
        return avatarURLCache[customAvatarID];
    }

    const info = parseCustomAvatarIDInfo(customAvatarID);

    if (info) {
        NativeModules.NativeBridge.getUserPhoto(info.did, info.tid, info.uid)
            .then(avatarURL => {
                avatarURLCache[customAvatarID] = avatarURL;

                // var profile = { avatarURL: avatarURL };
                // _updateProfile(profile);
            });

        return defaultImage;
    }

    return null;
}
