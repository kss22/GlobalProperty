export function saveLanguage(language) {
    localStorage.setItem("Language", language);
}

export function getLanguage() {
    return localStorage.getItem("Language");
}

export function clearLanguage(){
    return localStorage.removeItem("Language");
}