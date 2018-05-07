const SCHEMA_DATA = 'data:';
const SCHEMA_LETTER_AVATAR = 'letteravatar:';

/**
 * Check uri is an extended-schema
 *
 * @param {string} uri - The uri to check
 * @returns {boolean} True if is an extended-schema
 */
export function isExtendedSchema(uri) {
    return uri && uri.startsWith(SCHEMA_LETTER_AVATAR);
}

/**
 * parse extended-schema uri
 *
 * @param {string} uri - The uri to parse
 * @returns {string} Parsed url string
 */
export function parseExtendedAvatar(uri) {
    if (uri) {
        if (uri.startsWith(SCHEMA_LETTER_AVATAR)) {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACA'
+ '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';
        }
    }

    return uri;
}

/**
 * Check uri is an data-schema
 *
 * @param {string} uri - The uri to check
 * @returns {boolean} True if is an data-schema
 */
export function isDataSchema(uri) {
    return uri && uri.startsWith(SCHEMA_DATA);
}
