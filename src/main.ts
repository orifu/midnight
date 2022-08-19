import { createCountdown } from './countdown';
import { getTomorrow, hideAfterInactivity } from './util';

const timer = document.getElementById('timer')!;
const settingsParent = document.getElementById('settings')!;

document.getElementById('openSettings')!.onclick = () =>
    settingsParent.classList.add('shown');
document.getElementById('closeSettings')!.onclick = () =>
    settingsParent.classList.remove('shown');

hideAfterInactivity(document.getElementById('openSettings')!);
createCountdown(getTomorrow(), timer, {});
