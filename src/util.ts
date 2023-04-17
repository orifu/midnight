/**
 * Gives a date object representing midnight tomorrow.
 * Respects the user's timezone.
 * @returns A date object.
 */
export function getTomorrow() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
}

let timeSinceInactivity = 0;
const inactivityElements: HTMLElement[] = [];

setInterval(() => {
    // if we've been inactive for long enough,
    if (++timeSinceInactivity >= 20) {
        // hide all elements
        inactivityElements.forEach((el) => {
            el.classList.add('hidden');
        });
    }
}, 50);

/**
 * Will hide the given element if the mouse has not moved in one second.
 * @param element The element to hide.
 */
export function hideAfterInactivity(element: HTMLElement) {
    inactivityElements.push(element);
}

window.addEventListener('mousemove', () => {
    // when the mouse moves, set inactivity timeout to 0
    // and show hidden elements
    timeSinceInactivity = 0;

    inactivityElements.forEach((el) => {
        el.classList.remove('hidden');
    });
});
