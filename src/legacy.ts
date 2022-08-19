import { UserOptions } from './options';
import { createSaveFromSettings } from './saves';

function getCookie(wanted: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === wanted) {
            return value.trim();
        }
    }
    return null;
}

function optionsFromLegacyString(data: string): UserOptions {
    const splitData = data.split(',');

    const countdownEnd = new Date(parseInt(splitData[0]));
    countdownEnd.setHours(parseInt(splitData[1]));
    countdownEnd.setMinutes(parseInt(splitData[2]));

    return {
        countdownEnd: countdownEnd,
        endMessage: splitData[4],
        showDays: true,
        splitStyles: splitData[3] === 'true',
    };
}

/**
 * Parses cookies used in the old version of the Midnight page.
 */
export function getLegacyCookie(): UserOptions | null {
    const cookie = getCookie('save');
    if (cookie === null) {
        return null;
    }

    const oldOptions = optionsFromLegacyString(cookie);

    // store the old options as a new save
    createSaveFromSettings('Legacy', oldOptions);

    // remove the cookie
    document.cookie = 'save=;expires=Thu, 01 Jan 1970 00:00:00 GMT';

    return oldOptions;
}

export function getLegacyURLData(): UserOptions | null {
    const data = new URLSearchParams(location.search).get('data');
    if (data === null) {
        return null;
    }

    // remove search params
    history.replaceState(null, '', location.href.replace(location.search, ''));

    return optionsFromLegacyString(data);
}
