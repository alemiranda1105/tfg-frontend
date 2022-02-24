import { EmailRegex } from "./EmailRegex";

export const validateUsername = (username: string) => (username.length < 20 && username.length > 3);
export const validateEmail = (email: string) => {
    var regex = new RegExp(EmailRegex);
    return regex.test(email);
}
export const validatePassword = (password: string) => (password.length > 6);