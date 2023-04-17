import { createCountdown } from './countdown';
import { getLegacySave, getLegacyURLData } from './legacy';
import {
    defaultUserOptions,
    loadOptionsFromInputs,
    onInputChange,
    writeOptionsToInputs,
} from './options';
import { savesToHTML } from './saves';
import { fromShareURL } from './share';
import { hideAfterInactivity } from './util';

/** The element used for the timer. */
const timerElement = document.getElementById('timer')!;
const settingsParent = document.getElementById('settings')!;

document.getElementById('openSettings')!.onclick = () =>
    settingsParent.classList.add('shown');
document.getElementById('closeSettings')!.onclick = () =>
    settingsParent.classList.remove('shown');

hideAfterInactivity(document.getElementById('openSettings')!);
hideAfterInactivity(document.body);

onInputChange(() => {
    createCountdown(timerElement, loadOptionsFromInputs());
});

// if the user has a legacy save, then load it and show a message
const legacySave = getLegacySave();
if (legacySave !== null) {
    writeOptionsToInputs(legacySave);
    alert(
        "Welcome back! Since you left, we've rebuilt the site from the ground up.\n\nDon't worry, your old save isn't lost. We've turned it into a new save called 'Legacy' for you.",
    );
}

// if there is legacy URL data, then load it
const legacyURLData = getLegacyURLData();
if (legacyURLData !== null) {
    writeOptionsToInputs(legacyURLData);
}

// if there is URL data, load it, and remove it from the URL
if (location.hash.length) {
    writeOptionsToInputs(fromShareURL());
    history.replaceState(null, '', location.href.replace(location.hash, ''));
} else {
    // otherwise, load the default options
    writeOptionsToInputs(defaultUserOptions);
}

savesToHTML();
