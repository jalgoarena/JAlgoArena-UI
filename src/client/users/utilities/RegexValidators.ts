const displayNameRegex = /^[a-zA-Z\-_0-9]+$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*-]{6,}$/;

export function validateEmail(email: string, emailRegex: string) {
    return new RegExp(emailRegex, "i").test(email);
}

export function validateUserName(displayName: string) {
    return displayNameRegex.test(displayName);
}

export function validatePassword(password: string) {
    return passwordRegex.test(password);
}

