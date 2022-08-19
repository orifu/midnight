let activeCountdowns: number[] = [];

const pad = (n: number) => String(n).padStart(2, '0');

export type CountdownOptions = {
    countdownEnd: Date;
    endMessage?: string;
    showDays?: boolean;
};

export function createCountdown(
    element: HTMLElement,
    options: CountdownOptions,
) {
    // clear any existing countdowns
    while (activeCountdowns.length) {
        clearInterval(activeCountdowns[0]);
    }

    activeCountdowns.push(
        setInterval(() => {
            // time until the countdown ends (ms)
            const timeRemaining = +options.countdownEnd - +new Date();

            if (timeRemaining < 0) {
                element.classList.add('done');
                element.innerText = options.endMessage ?? '';
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
        }, 100),
    );
}
