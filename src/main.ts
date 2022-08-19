import { createCountdown } from './countdown';
import { getLegacyCookie } from './legacy';
import {
    defaultUserOptions,
    loadUserOptions,
    onInputChange,
    writeUserOptions,
} from './options';
import { savesToHTML } from './saves';
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
    alert(
        "Welcome back! Since you've left, we've rebuilt the site from the ground up.\n\nDon't worry, your old save isn't lost. We've turned it into a new save called 'Legacy' for you.",
    );
}

savesToHTML();
