// @flow
import { defaultImage } from './constraint';

/**
 * Retrieve user photo from web client.
 *
 * @param {string} customAvatarID - The custom avatarID.
 * @returns {string} - The avatarURL for user.
 */
export function generateUserPhoto(customAvatarID: string) {
    console.log(`generateUserPhoto: ${customAvatarID}`);

    return defaultImage;
}
