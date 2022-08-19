import { loadUserOptions, UserOptions, writeUserOptions } from './options';
import { toShareURL } from './share';

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
    const name = (
        document.getElementById('createSaveName')! as HTMLInputElement
    ).value;
    if (name in saves) {
        alert(
            'A save by this name already exists. Please delete that one first before creating a new save with the same name.',
        );
    } else {
        createSave(name);
        alert('Saved!');
    }
};

function loadSaves(): Record<string, RawJSONUserOptions> {
    return JSON.parse(localStorage.getItem('midnight')!);
}

export function createSave(name: string) {
    createSaveFromSettings(name, loadUserOptions());
}

export function createSaveFromSettings(name: string, settings: UserOptions) {
    saveToLocalStorage({
        ...saves,
        [name]: settings,
    });
    saves = loadSaves();
    savesToHTML();
}

function saveToLocalStorage(
    newSaves?: Record<string, RawJSONUserOptions | UserOptions>,
) {
    localStorage.setItem('midnight', JSON.stringify(newSaves ?? saves));
}

function convertJSONSave(save: RawJSONUserOptions): UserOptions {
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
        loadButton.onclick = () => {
            writeUserOptions(convertJSONSave(save));
        };
        buttonWrapper.appendChild(loadButton);

        const copyButton = document.createElement('button');
        copyButton.innerText = 'Copy';
        copyButton.onclick = () => {
            const shareHash = toShareURL(convertJSONSave(save));
            const shareURL =
                location.href.replace(location.hash, '') + '#' + shareHash;
            navigator.clipboard.writeText(shareURL);
            alert('Copied!');
        };
        buttonWrapper.appendChild(copyButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => {
            if (confirm(`Are you sure you want to delete ${name}?`)) {
                delete saves[name];
                saveToLocalStorage();
                savesToHTML();
            }
        };
        buttonWrapper.appendChild(deleteButton);
    }
}
