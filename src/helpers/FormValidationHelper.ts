import { EmailRegex } from "./EmailRegex";

export const validateUsername = (username: string) => (username.length < 20 && username.length > 3);
export const validateEmail = (email: string) => {
    var regex = new RegExp(EmailRegex);
    return regex.test(email);
}
export const validatePassword = (password: string) => (password.length > 6);

export const validateText = (text: string, maxLength?: number, minLength?: number, regex?: string | RegExp) => {
    let textLength = text.length;
    if(regex) {
        let regexp = new RegExp(regex);
        if(!regexp.test(text)) {
            return "Formato no válido";
        }
    }

    if(maxLength && (textLength > maxLength)) {
        return `El texto es demasiado largo, debe tener menos de ${maxLength} caracteres`;
    }

    if(minLength && (textLength < minLength)) {
        return `El texto es demasiado corto, debe tener más de ${minLength} caracteres`;
    }

    return "";
}