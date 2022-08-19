import { createCountdown } from './countdown';
import { getTomorrow } from './util';

const timer = document.getElementById('timer')!;

createCountdown(getTomorrow(), timer, {});
