export function isNotEmpty (value) {
    return typeof value === 'string' && value.trim() !== ''
}

export function hasMinLength (value, minLength) {
    return typeof value === 'string' && value.length >= minLength;
}

export function isEmail (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || '').trim());
}

export function isEqual (a, b) {
    return a === b;
}