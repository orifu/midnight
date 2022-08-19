let activeCountdowns: number[] = [];

const pad = (n: number) => String(n).padStart(2, '0');

export type CountdownOptions = {
    showDays?: boolean;
};

export function createCountdown(
    endDate: Date,
    element: HTMLElement,
    options: CountdownOptions,
) {
    // clear any existing countdowns
    while (activeCountdowns.length) {
        clearInterval(activeCountdowns[0]);
    }

    setInterval(() => {
        // time until the countdown ends (ms)
        const timeRemaining = +endDate - +new Date();

        if (timeRemaining < 0) {
            element.classList.add('done');
        } else {
            const totalSeconds = Math.floor(timeRemaining / 1000);
            const seconds = pad(totalSeconds % 60);
            const minutes = pad(Math.floor(totalSeconds / 60) % 60);
            const hours = pad(Math.floor(totalSeconds / 60 / 60) % 24);
            const days = pad(Math.floor(totalSeconds / 60 / 60 / 24));

            if (options.showDays ?? true) {
                element.innerText = `${days}:${hours}:${minutes}:${seconds}`;
            } else {
                element.innerText = `${hours}:${minutes}:${seconds}`;
            }
        }
    }, 100);
}
