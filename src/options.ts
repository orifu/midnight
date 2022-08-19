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
