import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContextProvider";
import { useAuthentication } from "../../hooks/useAuthenticaction";
import { CustomInput } from "../custom_components/CustomInput";
import { SubmitButton } from "../custom_components/SubmitButton";
import { ErrorValidationText } from "../custom_components/ErrorValidationText";
import { WelcomeUserComponent } from "../custom_components/WelcomeUserComponent";

export interface UserDataInterface {
    email: string, 
    username: string,
    password: string,
    token?: string,
    id?: string,
    role?: string
}

export const RegistrationFormComponent = () => {
    const navigate = useNavigate();
    // Current user
    const {token, user_id} = useContext(AuthContext);

    // userData
    const [userData, setUserData] = useState<UserDataInterface>({
        email: "",
        username: "",
        password:  "",
    }); 
    
    // Custom hook for auth
    const {data, validationError, loginError, isLogged, signUp} = useAuthentication(userData, false);

    // handler
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signUp();
    }

    useEffect(() => {
        if(token && user_id) {
            navigate("/");
        }
    })

    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md border bg-white">
            {data.id && !loginError && <WelcomeUserComponent data={data} />}

            {!isLogged && !token && !user_id &&
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="username">Username:</label>
                    <CustomInput type={"text"} name={"username"} placeholder={"Username"} handleChange={handleChange} required={true} />
                    {validationError.username && <ErrorValidationText error={validationError.username}/>}
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="email">Email:</label>
                    <CustomInput type={"email"} name={"email"} placeholder={"Email"} handleChange={handleChange} required={true} />
                    {validationError.email && <ErrorValidationText error={validationError.email}/>}
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="password">Password:</label>
                    <CustomInput type={"password"} name={"password"} placeholder={"Password"} handleChange={handleChange} required={true} />
                    {validationError.password && <ErrorValidationText error={validationError.password}/>}
                </div>
                <SubmitButton loginError={loginError} />
            </form>
            }
        </div>
    )
}