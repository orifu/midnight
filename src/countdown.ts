import { CountdownOptions } from './options';

let activeCountdowns: number[] = [];

const pad = (n: number) => String(n).padStart(2, '0');

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
                const totalSeconds = Math.floor(timeRemaining / 1000);
                const seconds = pad(totalSeconds % 60);
                const minutes = pad(Math.floor(totalSeconds / 60) % 60);
                const hours = pad(Math.floor(totalSeconds / 60 / 60) % 24);
                const days = pad(Math.floor(totalSeconds / 60 / 60 / 24));

                if ((options.showDays ?? true) || days !== '00') {
                    element.innerText = `${days}:${hours}:${minutes}:${seconds}`;
                } else {
                    element.innerText = `${hours}:${minutes}:${seconds}`;
                }
            }
        }, 100),
    );
}
