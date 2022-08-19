import { getTomorrow } from './util';

export const defaultCountdownOptions = {
    countdownEnd: getTomorrow(),
    endMessage: 'Tomorrow is another day.',
    showDays: false,
};

export const defaultUserOptions = {
    ...defaultCountdownOptions,
    splitStyles: false,
};

export type CountdownOptions = typeof defaultCountdownOptions;
export type UserOptions = typeof defaultUserOptions;

const options: Record<string, HTMLInputElement> = {};
const eventListeners: ((el: HTMLInputElement) => void)[] = [];

Object.keys(defaultUserOptions).forEach((name) => {
    options[name] = document.getElementById(name) as HTMLInputElement;
    options[name].onchange = () => {
        eventListeners.forEach((el) => el(options[name]));
    };
});

export function onInputChange(listener: (el: HTMLInputElement) => void) {
    eventListeners.push(listener);
}

export function loadUserOptions(): UserOptions {
    const cdEnd = options.countdownEnd.value;
    return {
        countdownEnd: cdEnd.length ? new Date(cdEnd) : new Date(),
        endMessage: options.endMessage.value,
        showDays: options.showDays.checked,
        splitStyles: options.splitStyles.checked,
    };
}

export function writeUserOptions(userOptions: UserOptions) {
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

    // broadcast that an input change has occurred
    for (const [_, option] of Object.entries(options)) {
        eventListeners.forEach((el) => el(option));
    }
}

// for options that don't effect the countdown
onInputChange((el) => {
    switch (el.id) {
        case 'splitStyles':
            if (el.checked) {
                document.body.classList.add('unus-annus');
            } else {
                document.body.classList.remove('unus-annus');
            }
            break;
    }
});
