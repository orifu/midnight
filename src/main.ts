import { createCountdown } from './countdown';
import { getLegacyCookie } from './legacy';
import {
    loadUserOptions,
    onInputChange,
    UserOptions,
    writeUserOptions,
} from './options';
import { getTomorrow, hideAfterInactivity } from './util';

const timer = document.getElementById('timer')!;
const settingsParent = document.getElementById('settings')!;

document.getElementById('openSettings')!.onclick = () =>
    settingsParent.classList.add('shown');
document.getElementById('closeSettings')!.onclick = () =>
    settingsParent.classList.remove('shown');

hideAfterInactivity(document.getElementById('openSettings')!);

const defaultCountdownOptions: UserOptions = {
    countdownEnd: getTomorrow(),
    endMessage: 'Tomorrow is another day.',
    showDays: false,
    splitStyles: false,
};

onInputChange(() => {
    createCountdown(timer, loadUserOptions());
});

const legacyCookie = getLegacyCookie();
if (legacyCookie === null) {
    writeUserOptions(defaultCountdownOptions);
} else {
    writeUserOptions(legacyCookie);
}
