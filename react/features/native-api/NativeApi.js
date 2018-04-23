// import React, { Component } from 'react';
// import { DeviceEventEmitter } from 'react-native';

import { updateProfile } from '../base/profile';

// import { toState } from '../base/redux';

const logger = require('jitsi-meet-logger').getLogger(__filename);

let store;

/**
 * Setup default values for app.
 *
 * @param {Object} _store - The store object for saving data.
 * @param {Object} props - The initialization values.
 * @returns {void}
 */
export function setup(_store, props) {
    logger.log('NativeApi init');

    store = _store;

    if (props.url) {
        const profile = {};

        if (props.url.displayName) {
            logger.log(`props.url.displayName found: ${props.url.displayName}`);
            profile.displayName = props.url.displayName;
        }

        if (props.url.email) {
            logger.log(`props.url.email found: ${props.url.email}`);
            profile.email = props.url.email;
        }

        if (props.url.avatarURL) {
            logger.log(`props.url.avatarURL found: ${props.url.avatarURL}`);
            profile.avatarURL = props.url.avatarURL;
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
function _updateProfile(profile) {
    console.log('_updateProfile');
    console.log(profile);
    store.dispatch(updateProfile(profile));
}
