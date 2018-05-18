// import React, { Component } from 'react';
// import { NativeModules, DeviceEventEmitter } from 'react-native'
import { updateProfile } from '../base/profile';

// import { toState } from '../base/redux';

import { buildCustomAvatarID } from './functions';

const logger = require('jitsi-meet-logger').getLogger(__filename);

let store;

/**
 * Setup default values for app.
 *
 * @param {Object} _store - The store object for saving data.
 * @param {Object} props - The initialization values.
 * @returns {void}
 */
export function setupNativeBridge(_store, props) {
    logger.log('setupNativeBridge() called');

    store = _store;

    if (props.url.nativeBridge) {
        const c = props.url.nativeBridge;
        const profile = {};

        if (c.did && c.tid && c.uid) {
            logger.log('c.did & c.tid & c.uid found:'
                + `${c.did}/${c.tid}/${c.uid}`);
            profile.avatarID = buildCustomAvatarID(c.did, c.tid, c.uid);
        }

        _updateProfile(profile);

        // logger.log('store.getState():');
        // logger.log(store.getState());
        // logger.log('store.getState() => toState: ' +
        //     JSON.stringify(
        //         toState(store.getState())['features/base/participants']));
    }
}

//        DeviceEventEmitter.addListener('NativeApi', ev => {
//            logger.log('Receive NativeApi')
//            logger.log(ev);
//            switch(ev.event){
//                case 'changeDisplayName':
//
//                    changeDisplayName(ev.displayName);
// //                jitsiLocalStorage.setItem('displayname',
// //                                ev.displayName);
// //                    _sendEvent('display-name',
// //                    {
// //                        displayName: ev.displayName
// //                    });
//                break;
//            }
//        });

/**
 * Private method for updating profile.
 *
 * @param {Object} profile - The new profile to update.
 * @private
 * @returns {void}
 */
export function _updateProfile(profile) {
    console.log('_updateProfile');
    console.log(profile);
    store.dispatch(updateProfile(profile));
}


