import { CountdownOptions, createCountdown } from './countdown';
import { loadUserOptions, onInputChange } from './options';
import { getTomorrow, hideAfterInactivity } from './util';

const timer = document.getElementById('timer')!;
const settingsParent = document.getElementById('settings')!;

document.getElementById('openSettings')!.onclick = () =>
    settingsParent.classList.add('shown');
document.getElementById('closeSettings')!.onclick = () =>
    settingsParent.classList.remove('shown');

hideAfterInactivity(document.getElementById('openSettings')!);

const defaultCountdownOptions: CountdownOptions = {
    countdownEnd: getTomorrow(),
    endMessage: 'Tomorrow is another day.',
    showDays: false,
};

onInputChange(() => {
    createCountdown(timer, loadUserOptions());
});

createCountdown(timer, loadUserOptions());
