import { loadUserOptions, UserOptions } from './options';

document.getElementById('copyShareURL')!.onclick = () => {
    const shareURL = toShareURL(loadUserOptions());
    navigator.clipboard.writeText(shareURL);
    alert('Copied!');
};

export function toShareURL(options: UserOptions) {
    return (
        location.href.replace(location.hash, '') + '#' + toShareHash(options)
    );
}

export function toShareHash(options: UserOptions) {
    // '1' is the version number
    // if more options are added to the output,
    // breaking changes may be made
    let output = '1';

    // convert the end timestamp to seconds
    // then to base 36
    output += (+options.countdownEnd / 1000).toString(36);

    // separator
    output += '|';

    // end message string converted to base64
    // and stripped of ending =
    output += btoa(options.endMessage).replace(/=+$/, '');

    // separator
    output += '|';

    // flags
    // 1 << 0 - show days
    // 1 << 1 - split styles
    const flags =
        +options.showDays * (1 << 0) + +options.splitStyles * (1 << 1);
    output += String.fromCharCode(0b0110_0001 + flags);

    return output;
}

export function fromShareURL(): UserOptions {
    return fromShareHash(location.hash.substring(1));
}

export function fromShareHash(share: string): UserOptions {
    switch (share[0]) {
        // version 1
        case '1':
            const args = share.substring(1).split('|');

            const countdownEnd = new Date(parseInt(args[0], 36) * 1000);
            const endMessage = atob(args[1]);

            const flags = args[2]
                .split('')
                .map((c) => c.charCodeAt(0) - 0b0110_0001);
            const hasFlag = (shift: number) =>
                (flags[Math.floor(shift / 4)] & (1 << shift % 4)) > 0;

            return {
                countdownEnd,
                endMessage,
                showDays: hasFlag(0),
                splitStyles: hasFlag(1),
            };
    }

    throw new Error(`Unknown version type ${share[0]}!`);
}
