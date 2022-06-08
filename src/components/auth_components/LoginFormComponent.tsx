import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContextProvider";
import { useAuthentication } from "../../hooks/useAuthenticaction";
import { CustomInput } from "../custom_components/CustomInput";
import { SubmitButton } from "../custom_components/SubmitButton";
import { WelcomeUserComponent } from "../custom_components/WelcomeUserComponent";
import { UserDataInterface } from "./RegistrationFormComponent";

import '../../styles/FormStyles.css'

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
    const [userData, setUserData] = useState<UserDataInterface>({
        email: "",
        username: "",
        password:  ""
    });

    // Custom hook for auth
    const {data, loginError, isLogged, login} = useAuthentication(userData, true);
    
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login();
    }

    useEffect(() => {
        if(token && user_id) {
            navigate("/");
        }
    })

    return(
        <div className="flex flex-col justify-center items-center w-3/4 p-4 rounded-md border bg-white">
            {data.id && !loginError && <WelcomeUserComponent data={data} />}
            {!isLogged && !token && !user_id &&
            <>
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>      
                    <div className="form-field">
                        <div className="form-input">
                            <label className="w-[120px]" htmlFor="email">Email or username:</label>
                            <CustomInput type={"text"} name={"email"} placeholder={"Email"} required={true} handleChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-input">
                            <label className="w-[120px]" htmlFor="password">Password:</label>
                            <CustomInput type={"password"} name={"password"} placeholder={"Password"} required={true} handleChange={handleChange} />
                        </div>
                    </div>
                    <SubmitButton loginError={loginError} text="Login"/>
                </form>
            </>
            }
            
        </div>
    )
}