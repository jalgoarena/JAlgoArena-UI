import config from '../../config'

const displayNameRegex = /^[a-zA-Z\-_0-9]+$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*-]{6,}$/;

export function validateEmail(email) {
    return config.emailRegex.test(email);
}

export function validateUserName(displayName) {
    return displayNameRegex.test(displayName);
}


export function validatePassword(password) {
    return passwordRegex.test(password);
}

