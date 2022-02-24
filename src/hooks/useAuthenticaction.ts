import axios from "axios";
import { useEffect, useState } from "react";
import { setCookie } from "react-use-cookie";
import { UserDataInterface } from "../components/RegistrationFormComponent";
import { validateUsername, validateEmail, validatePassword } from "../helpers/FormValidationHelper";

export function useAuthentication(userData: UserDataInterface) {
    const [loginError, setLoginError] = useState("");

    const [validationError, setValidationError] = useState<UserDataInterface>({
        email: "",
        username: "",
        password:  ""
    });

    const [data, setData] = useState<UserDataInterface>({
        username: "",
        email: "",
        password: ""
    });

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if(userData.username.length > 0 &&!validateUsername(userData.username)) {
            setValidationError(prevState => ({
                ...prevState,
                username: "Introduzca un nombre de usuario de entre 3 y 20 caracteres"
            }));
        } else {
            setValidationError(prevState => ({
                ...prevState,
                username: ""
            }));
        }
        if(userData.email.length > 0 && !validateEmail(userData.email)) {
            setValidationError(prevState => ({
                ...prevState,
                email: "Introduzca un email válido"
            }));
        } else {
            setValidationError(prevState => ({
                ...prevState,
                email: ""
            }));
        }
        if(userData.password.length > 0 && !validatePassword(userData.password)) {
            setValidationError(prevState => ({
                ...prevState,
                password: "Introduzca una contraseña más larga"
            }));
        } else {
            setValidationError(prevState => ({
                ...prevState,
                password: ""
            }));
        }
    }, [userData.username, userData.email, userData.password])

    const signUp = async () => {
        if(validateUsername(userData.username) && validateEmail(userData.email) && validatePassword(userData.password)) {
            await axios.post(`${process.env.REACT_APP_API_URL}/users/`, userData)
            .then(res => res.data as UserDataInterface)
            .then(data => {
                setLoginError("");
                setData(data);
                data.token && setCookie('token', data.token, { days: 30 });
                data.id && setCookie('user_id', data.id, { days: 30 });
                setIsLogged(true);
            })
            .catch(error => {
                setIsLogged(false);
                if(axios.isAxiosError(error)) {
                    setLoginError(error.response?.data['detail'] ?? 'Algo ha ido mal, inténtelo de nuevo más tarde');
                } else {
                    setLoginError('Algo ha ido mal, inténtelo de nuevo más tarde');
                }
            });
        }
    }

    const login = () => {
        
    }

    return {data, validationError, loginError, isLogged, signUp, login};
}