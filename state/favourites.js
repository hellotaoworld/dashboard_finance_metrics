const STORAGE_KEY = 've_favourites';

export function getFavourites() {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

export function addFavourite({ company, sector }) {
    const favs = getFavourites();
    if (!favs.find(f => f.company === company)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...favs, { company, sector }]));
    }
}

export function removeFavourite(company) {
    const favs = getFavourites().filter(f => f.company !== company);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function isFavourite(company) {
    return getFavourites().some(f => f.company === company);
}
