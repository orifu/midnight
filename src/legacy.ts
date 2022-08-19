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

/**
 * Parses cookies used in the old version of the Midnight page.
 */
export function getLegacyCookie(): UserOptions | null {
    const cookie = getCookie('save');
    if (cookie === null) {
        return null;
    }

    const cookieData = cookie.split(',');

    const countdownEnd = new Date(parseInt(cookieData[0]));
    countdownEnd.setHours(parseInt(cookieData[1]));
    countdownEnd.setMinutes(parseInt(cookieData[2]));

    const oldOptions = {
        countdownEnd: countdownEnd,
        endMessage: cookieData[4],
        showDays: true,
        splitStyles: cookieData[3] === 'true',
    };

    // store the old options as a new save
    createSaveFromSettings('Legacy', oldOptions);

    // remove the cookie
    document.cookie = 'save=;expires=Thu, 01 Jan 1970 00:00:00 GMT';

    return oldOptions;
}
