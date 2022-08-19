import { CountdownOptions } from './countdown';

const options: Record<string, HTMLInputElement> = {};
const eventListeners: (() => void)[] = [];

['countdownEnd', 'endMessage', 'showDays', 'splitStyles'].forEach((name) => {
    options[name] = document.getElementById(name) as HTMLInputElement;
    options[name].onchange = () => {
        eventListeners.forEach((el) => el());
    };
});

export function onInputChange(listener: () => void) {
    eventListeners.push(listener);
}

export function loadUserOptions(): CountdownOptions {
    return {
        countdownEnd: new Date(options.countdownEnd.value),
        endMessage: options.endMessage.value,
        showDays: options.showDays.checked,
    };
}
