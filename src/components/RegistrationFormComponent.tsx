import axios from "axios";
import React, { useContext, useState } from "react"
import { setCookie } from "react-use-cookie";
import { AuthContext } from "../auth/AuthContextProvider";
import { validateUsername, validateEmail, validatePassword } from "../helpers/FormValidationHelper";
import { CustomInput } from "./CustomInput";
import { ErrorValidationText } from "./ErrorValidationText";
import { SubmitButton } from "./SubmitButton";

export interface UserDataInterface {
    email: string, 
    username: string,
    password: string,
    token?: string,
    id?: string
}

export const RegistrationFormComponent = () => {
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

    // Session
    const { setId, setToken } = useContext(AuthContext);

    // Handle
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        await axios.post(`${process.env.REACT_APP_API_URL}/users/`, userData)
        .then(res => res.data as UserDataInterface)
        .then(data => {
            setLoginError("");
            setUserData(data);
            data.token && setCookie('token', data.token, { days: 30 });
            data.id && setCookie('user_id', data.id, { days: 30 });
            data.id && setId(data.id);
            data.token && setToken(data.token);
        })
        .catch(error => {
            if(axios.isAxiosError(error)) {
                setLoginError(error.response?.data['detail'] ?? 'Algo ha ido mal, inténtelo de nuevo más tarde');
            } else {
                setLoginError('Algo ha ido mal, inténtelo de nuevo más tarde');
            }
        })
    }


    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="username">Nombre de usuario:</label>
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