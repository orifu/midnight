export function getTomorrow() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
}

let inactivityInterval: number | null = null;
let timeSinceInactivity = 0;
const inactivityElements: HTMLElement[] = [];

export function hideAfterInactivity(element: HTMLElement) {
    if (inactivityInterval === null) {
        inactivityInterval = setInterval(() => {
            // if we've been inactive for long enough,
            if (++timeSinceInactivity >= 20) {
                // hide all elements
                inactivityElements.forEach((el) => {
                    el.style.opacity = '0';
                });
            }
        }, 50);
    }

    inactivityElements.push(element);
}

window.addEventListener('mousemove', () => {
    // when the mouse moves, set inactivity timeout to 0
    // and show hidden elements
    timeSinceInactivity = 0;

    inactivityElements.forEach((el) => {
        el.style.removeProperty('opacity');
    });
});
