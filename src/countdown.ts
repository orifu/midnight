import { CountdownOptions } from './options';

/** The interval IDs for any active countdowns. */
const activeCountdowns: number[] = [];

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Creates a new countdown.
 * @param element The element that the countdown information will be written to.
 * @param options The options for the countdown.
 */
export function createCountdown(
    element: HTMLElement,
    options: CountdownOptions,
) {
    // clear any existing countdowns
    while (activeCountdowns.length) {
        clearInterval(activeCountdowns.pop());
    }

    activeCountdowns.push(
        setInterval(() => {
            // time until the countdown ends (ms)
            const timeRemaining = +options.countdownEnd - +new Date();

            if (timeRemaining < 0) {
                element.classList.add('done');
                element.innerText = options.endMessage ?? '';
            } else {
                element.classList.remove('done');
                let totalTime = Math.floor(timeRemaining / 1000);
                const seconds = pad(totalTime % 60);
                const minutes = pad(Math.floor((totalTime /= 60)) % 60);
                const hours = pad(Math.floor((totalTime /= 60)) % 24);
                const days = pad(Math.floor((totalTime /= 24)));

                // if the showDays option is set to true
                // or there is at least one day remaining,
                // then show the day count with the time.
                if ((options.showDays ?? true) || totalTime >= 1) {
                    element.innerText = `${days}:${hours}:${minutes}:${seconds}`;
                } else {
                    element.innerText = `${hours}:${minutes}:${seconds}`;
                }
            }
        }, 100),
    );
}
