// @flow
import { avatarRegex } from './constraint';

/**
 * Build custom avatarID.
 *
 * @param {string} did - The did.
 * @param {string} tid - The tid.
 * @param {string} uid - The uid.
 * @returns {string} - The custom avatarID.
 */
export function buildCustomAvatarID(
        did: string, tid: string, uid: string) {
    return `avatar:${did}/${tid}/${uid}`;
}

/**
 * Check avatarID is a custom avatar ID.
 *
 * @param {string} avatarID - The avatarID.
 * @returns {boolean} - True if the avatarID is a custom avatarID.
 */
export function isCustomAvatarID(avatarID: string) {
    if (avatarRegex.exec(avatarID)) {
        return true;
    }

    return false;
}

/**
 * Parse custom avatarID to avatar info object.
 *
 * @param {string} avatarID - The avatarID.
 * @returns {boolean} - Object for avatar info or null if not custom avatarID.
 */
export function parseCustomAvatarIDInfo(avatarID: string) {
    const match = avatarRegex.exec(avatarID);

    if (match) {

        return {
            did: match[1],
            tid: match[2],
            uid: match[3]
        };
    }

    return null;
}
