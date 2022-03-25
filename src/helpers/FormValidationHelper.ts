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
            return "Invalid format";
        }
    }

    if(maxLength && (textLength > maxLength)) {
        return `The text is too long, must be shorter than ${maxLength} characters`;
    }

    if(minLength && (textLength < minLength)) {
        return `The text is to short, must be longer than ${minLength} characters`;
    }

    return "";
}