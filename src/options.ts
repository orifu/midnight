import { CountdownOptions } from './countdown';

const options: Record<string, HTMLInputElement> = {};
const eventListeners: ((name: string, el: HTMLInputElement) => void)[] = [];

['countdownEnd', 'endMessage', 'showDays', 'splitStyles'].forEach((name) => {
    options[name] = document.getElementById(name) as HTMLInputElement;
    options[name].onchange = () => {
        eventListeners.forEach((el) => el(name, options[name]));
    };
});

export function onInputChange(
    listener: (name: string, el: HTMLInputElement) => void,
) {
    eventListeners.push(listener);
}

export function loadUserOptions(): CountdownOptions {
    return {
        countdownEnd: new Date(options.countdownEnd.value),
        endMessage: options.endMessage.value,
        showDays: options.showDays.checked,
    };
}

export function writeUserOptions(cdOptions: CountdownOptions) {
    // from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#the_y10k_problem_often_client-side
    // and https://stackoverflow.com/a/64440084
    function dateToISOString(date: Date) {
        const unixDate = new Date(+date);
        unixDate.setMinutes(unixDate.getMinutes() - date.getTimezoneOffset());

        const isoString = unixDate.toISOString();
        return isoString.substring(0, isoString.indexOf('T') + 6);
    }

    options.countdownEnd.value = dateToISOString(cdOptions.countdownEnd);
    options.endMessage.value = cdOptions.endMessage;
    options.showDays.checked = cdOptions.showDays;
}

// for options that don't effect the countdown
onInputChange((name, el) => {
    switch (name) {
        case 'splitStyles':
            if (el.checked) {
                document.body.classList.add('unus-annus');
            } else {
                document.body.classList.remove('unus-annus');
            }
            break;
    }
});
