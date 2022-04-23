import { EmailRegex } from "./EmailRegex";

export const validateUsername = (username: string) => (username.length < 20 && username.length > 3);
export const validateEmail = (email: string) => {
    var regex = new RegExp(EmailRegex);
    return regex.test(email);
}
export const validatePassword = (password: string) => (password.length > 6);

/**
 * 
 * @param text Text to validate
 * @param maxLength Max length of the text
 * @param minLength Min length of the text
 * @param regex Pattern the text needs to match
 * @returns error message or an empty string
 */
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