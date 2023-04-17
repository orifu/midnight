import { getTomorrow } from './util';

/**
 * The default options for the countdown.
 * When any of these settings are changed, the countdown needs to be destroyed and rebuilt.
 */
export const defaultCountdownOptions = {
    countdownEnd: getTomorrow(),
    endMessage: 'Tomorrow is another day.',
    showDays: false,
};

/**
 * The default user options.
 * Options that are in this object that aren't in the countdown options are unrelated to the countdown.
 */
export const defaultUserOptions = {
    ...defaultCountdownOptions,
    splitStyles: false,
    invertColors: false,
};

export type CountdownOptions = typeof defaultCountdownOptions;
/** The type corresponding to the user's options. */
export type UserOptions = typeof defaultUserOptions;

/** Listener functions, which are called when any of the option input elements are changed. */
const eventListeners: ((el: HTMLInputElement) => void)[] = [];

/** Maps each of the user options to the corresponding input element. */
// @ts-ignore
// idk how to do this properly lol
const options: {
    [K in keyof UserOptions]: HTMLInputElement;
} = {};
(Object.keys(defaultUserOptions) as (keyof UserOptions)[]).forEach((name) => {
    options[name] = document.getElementById(name) as HTMLInputElement;
    options[name].onchange = () => {
        eventListeners.forEach((el) => el(options[name]));
    };
});

/**
 * Creates a new listener, which will be called when any of the option input elements are changed.
 * @param listener The listener. Takes in the input element as its argument.
 */
export function onInputChange(listener: (el: HTMLInputElement) => void) {
    eventListeners.push(listener);
}

/**
 * Loads the user's option from the option input elements.
 * @returns The options.
 */
export function loadOptionsFromInputs(): UserOptions {
    const cdEnd = options.countdownEnd.value;
    return {
        countdownEnd: cdEnd.length ? new Date(cdEnd) : new Date(),
        endMessage: options.endMessage.value,
        showDays: options.showDays.checked,
        splitStyles: options.splitStyles.checked,
        invertColors: options.invertColors.checked,
    };
}

/**
 * Writes the given options to the option input elements.
 * @param userOptions The options to write.
 */
export function writeOptionsToInputs(userOptions: UserOptions) {
    // as we're using a datetime-local input, this converts it to an ISO string
    // from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#the_y10k_problem_often_client-side
    // and https://stackoverflow.com/a/64440084
    function dateToISOString(date: Date) {
        const unixDate = new Date(+date);
        unixDate.setMinutes(unixDate.getMinutes() - date.getTimezoneOffset());

        const isoString = unixDate.toISOString();
        return isoString.substring(0, isoString.indexOf('T') + 6);
    }

    options.countdownEnd.value = dateToISOString(userOptions.countdownEnd);
    options.endMessage.value = userOptions.endMessage;
    options.showDays.checked = userOptions.showDays;
    options.splitStyles.checked = userOptions.splitStyles;
    options.invertColors.checked = userOptions.invertColors;

    // broadcast that an input change has occurred
    for (const option of Object.values(options)) {
        eventListeners.forEach((el) => el(option));
    }
}

// for options that don't affect the countdown
onInputChange((el) => {
    switch (el.id) {
        case 'splitStyles':
            if (el.checked) {
                document.body.classList.add('split-styles');
            } else {
                document.body.classList.remove('split-styles');
            }
            break;

        case 'invertColors':
            if (el.checked) {
                document.body.classList.add('invert-colors');
            } else {
                document.body.classList.remove('invert-colors');
            }
            break;
    }
});
