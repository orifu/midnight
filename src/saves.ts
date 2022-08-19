import { loadUserOptions, UserOptions } from './options';

// https://stackoverflow.com/a/54975267
type Overwrite<T, U> = Omit<T, keyof U> & U;
type RawJSONUserOptions = Overwrite<
    UserOptions,
    {
        countdownEnd: string;
    }
>;

if (!('midnight' in localStorage)) {
    localStorage.setItem('midnight', '{}');
}

// load saves from local storage
let saves = loadSaves();
const savesParent = document.getElementById('saves')!;

// add save button
document.getElementById('createSaveButton')!.onclick = () => {
    createSave(
        (document.getElementById('createSaveName')! as HTMLInputElement).value,
    );
    alert('Saved!');
};

function loadSaves(): Record<string, RawJSONUserOptions> {
    return JSON.parse(localStorage.getItem('midnight')!);
}

function createSave(name: string) {
    localStorage.setItem(
        'midnight',
        JSON.stringify({
            ...saves,
            [name]: loadUserOptions(),
        }),
    );
    saves = loadSaves();
    savesToHTML();
}

function saveToSettings(save: RawJSONUserOptions): UserOptions {
    return {
        ...save,
        countdownEnd: new Date(save.countdownEnd),
    };
}

export function savesToHTML() {
    while (savesParent.firstChild) {
        savesParent.removeChild(savesParent.lastChild!);
    }

    for (const [name, save] of Object.entries(saves)) {
        const nameEl = document.createElement('span');
        nameEl.innerText = name;
        savesParent.appendChild(nameEl);

        const buttonWrapper = document.createElement('div');
        savesParent.appendChild(buttonWrapper);

        const loadButton = document.createElement('button');
        loadButton.innerText = 'Load';
        buttonWrapper.appendChild(loadButton);

        const copyButton = document.createElement('button');
        copyButton.innerText = 'Copy';
        buttonWrapper.appendChild(copyButton);
    }
}
