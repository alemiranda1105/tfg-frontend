import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContextProvider";
import { useAuthentication } from "../hooks/useAuthenticaction";
import { CustomInput } from "./CustomInput";
import { ErrorValidationText } from "./ErrorValidationText";
import { UserDataInterface } from "./RegistrationFormComponent";
import { SelectorComponent } from "./SelectorComponent";
import { SubmitButton } from "./SubmitButton";
import { WelcomeUserComponent } from "./WelcomeUserComponent";

export interface LoginData {
    username?: string,
    email?: string,
    password: string
}

export const LoginFormComponent = () => {
    const navigate = useNavigate();
    // Context
    const { token, user_id } = useContext(AuthContext);

    // States
    const[loginEmail, setLoginEmail] = useState(false);
    const [userData, setUserData] = useState<UserDataInterface>({
        email: "",
        username: "",
        password:  ""
    });

    // Custom hook for auth
    const {data, validationError, loginError,  isLogged, login} = useAuthentication(userData, true);
    
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(loginEmail);
    }

    useEffect(() => {
        if(token && user_id) {
            navigate("/");
        }
    })

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            {data.id && !loginError && <WelcomeUserComponent data={data} />}
            {!isLogged && !token && !user_id &&
            <>
                <SelectorComponent negativeTxt={"Nombre de usuario"} positiveTxt={"Correo electrónico"} status={loginEmail} setStatus={setLoginEmail} />
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    {!loginEmail &&
                        <div className="flex flex-col items-center w-full m-3">
                            <label htmlFor="username">Nombre de usuario:</label>
                            <CustomInput type={"text"} name={"username"} placeholder={"Nombre de usuario"} required={true} handleChange={handleChange} />
                            {validationError.username && <ErrorValidationText error={validationError.username}/>}
                        </div>
                    }
                    {loginEmail &&
                    <div className="flex flex-col items-center w-full m-3">
                        <label htmlFor="email">Correo electrónico:</label>
                        <CustomInput type={"email"} name={"email"} placeholder={"Email"} required={true} handleChange={handleChange} />
                        {validationError.email && <ErrorValidationText error={validationError.email}/>}
                    </div>
                    }
                    <div className="flex flex-col items-center w-full m-3">
                        <label htmlFor="password">Contraseña:</label>
                        <CustomInput type={"password"} name={"password"} placeholder={"Contraseña"} required={true} handleChange={handleChange} />
                        {validationError.password && <ErrorValidationText error={validationError.password}/>}
                    </div>
                    <SubmitButton loginError={loginError} />
                </form>
            </>
            }
            
        </div>
    )
}