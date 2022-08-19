import { createCountdown } from './countdown';
import { getLegacyCookie } from './legacy';
import {
    defaultUserOptions,
    loadUserOptions,
    onInputChange,
    writeUserOptions,
} from './options';
import { hideAfterInactivity } from './util';

const timer = document.getElementById('timer')!;
const settingsParent = document.getElementById('settings')!;

document.getElementById('openSettings')!.onclick = () =>
    settingsParent.classList.add('shown');
document.getElementById('closeSettings')!.onclick = () =>
    settingsParent.classList.remove('shown');

hideAfterInactivity(document.getElementById('openSettings')!);

onInputChange(() => {
    createCountdown(timer, loadUserOptions());
});

const legacyCookie = getLegacyCookie();
if (legacyCookie === null) {
    writeUserOptions(defaultUserOptions);
} else {
    writeUserOptions(legacyCookie);
}
