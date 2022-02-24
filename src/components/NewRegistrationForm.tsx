import React, { useState } from "react"
import { EmailRegex } from "../helpers/EmailRegex";
import { CustomInput } from "./CustomInput";
import { ErrorValidationText } from "./ErrorValidationText";
import { UserDataInterface } from "./RegistrationFormComponent"
import { SubmitButton } from "./SubmitButton";


export const NewRegistrationForm = () => {
    const [userData, setUserData] = useState<UserDataInterface>({
        email: "",
        username: "",
        password:  ""
    });
    const [validationError, setValidationError] = useState<UserDataInterface>({
        email: "",
        username: "",
        password:  ""
    });
    const [loginError, setLoginError] = useState("");

    // Validations
    const validateUsername = (username: string) => (username.length < 20 && username.length > 3);
    const validateEmail = (email: string) => {
        var regex = new RegExp(EmailRegex);
        return regex.test(email);
    }
    const validatePassword = (password: string) => (password.length > 6);

    // Handle
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!validateUsername(userData.username)) {
            setValidationError(prevState => ({
                ...prevState,
                username: "Introduzca un nombre de usuario de entre 3 y 20 caracteres"
            }));
        }
        if(!validateEmail(userData.email)) {
            setValidationError(prevState => ({
                ...prevState,
                email: "Introduzca un email válido"
            }));
        }
        if(!validatePassword(userData.password)) {
            setValidationError(prevState => ({
                ...prevState,
                password: "Introduzca una contraseña más larga"
            }));
        }
        if(validateUsername(userData.username) && validateEmail(userData.email) && validatePassword(userData.password)) {
            console.log(userData);
        }
    }


    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="username">Registro de usuario:</label>
                    <CustomInput type={"text"} name={"username"} placeholder={"Nombre de usuario"} handleChange={handleChange} required={true} />
                    {validationError.username && <ErrorValidationText error={validationError.username}/>}
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="email">Correo electrónico:</label>
                    <CustomInput type={"email"} name={"email"} placeholder={"Email"} handleChange={handleChange} required={true} />
                    {validationError.email && <ErrorValidationText error={validationError.email}/>}
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="contraseña">Contraseña:</label>
                    <CustomInput type={"password"} name={"password"} placeholder={"Contraseña"} handleChange={handleChange} required={true} />
                    {validationError.password && <ErrorValidationText error={validationError.password}/>}
                </div>
                <SubmitButton loginError={loginError} />
            </form>
        </div>
    )
}