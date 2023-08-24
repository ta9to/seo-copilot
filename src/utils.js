export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    } else {
        return str;
    }
}

export function saveToStorage(key, value, isJSON = false) {
    if (chrome.storage) {
        chrome.storage.local.set({ [key]: isJSON ? JSON.stringify(value) : value });
    } else {
        localStorage.setItem(key, isJSON ? JSON.stringify(value) : value);
    }
}

export function getFromStorage(key) {
    return new Promise((resolve) => {
        if (chrome.storage) {
            chrome.storage.local.get(key, (result) => resolve(result));
        } else {
            resolve(localStorage.getItem(key));
        }
    });
}
