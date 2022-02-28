import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { setCookie } from "react-use-cookie";
import { AuthContext } from "../auth/AuthContextProvider";
import { UserDataInterface } from "../components/auth_components/RegistrationFormComponent";
import { validateUsername, validateEmail, validatePassword } from "../helpers/FormValidationHelper";

export function useAuthentication(userData: UserDataInterface, fromLogin: boolean) {
    // Auth context
    const {setId, setToken} = useContext(AuthContext);

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

    const saveSession = (id: string, token: string) => {
        setCookie('token', token, { days: 30 });
        setToken(token);
        setCookie('user_id', id, { days: 30 });
        setId(id);
    }

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
        if(!fromLogin) {
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
        }
    }, [userData.username, userData.email, userData.password, fromLogin])

    const signUp = async () => {
        if(validateUsername(userData.username) && validateEmail(userData.email) && validatePassword(userData.password)) {
            await axios.post(`${process.env.REACT_APP_API_URL}/users/`, userData)
            .then(res => res.data as UserDataInterface)
            .then(data => {
                if(data.token && data.id) {
                    setLoginError("");
                    setData(data);
                    saveSession(data.id, data.token);
                    setIsLogged(true);
                } else {
                    throw Error("Token/Id no válidos");
                }
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

    const login = async (loginEmail: boolean) => {
        var loginData;
        if(userData.password.length <= 0) {
            setValidationError(prevState => ({
                ...prevState,
                password: "Introduzca una contraseña"
            }));
        }
        if(loginEmail) {
            if(validateEmail(userData.email)) {
                loginData = {
                    "email": userData.email,
                    "password": userData.password
                }
            } else {
                return;
            }
        } else {
            if(validateUsername(userData.username)) {
                loginData = {
                    "username": userData.username,
                    "password": userData.password
                }
            } else {
                return;
            }
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, loginData)
        .then(res => res.data as UserDataInterface)
        .then(data => {
            if(data.token && data.id) {
                setLoginError("");
                setData(data);
                saveSession(data.id, data.token);
                setIsLogged(true);
            } else {
                throw Error("Token/Id no válidos");
            }
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

    return {data, validationError, loginError, isLogged, signUp, login};
}