import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailRegex } from "../../helpers/EmailRegex";
import { validateText } from "../../helpers/FormValidationHelper";
import { useFetch } from "../../hooks/useFetch";
import { UserDataInterface } from "../auth_components/RegistrationFormComponent";
import { CustomInput } from "../custom_components/CustomInput"
import { ErrorValidationText } from "../custom_components/ErrorValidationText";
import { LoadingComponent } from "../custom_components/LoadingComponent";
import { SubmitButton } from "../custom_components/SubmitButton";
import { UserProfileData } from "./UserDataComponent";

import '../../styles/FormStyles.css'

interface UserForm {
    user_id: string,
    token: string
}

export const UpdateUserForm = ({user_id, token}: UserForm) => {
    const {data: oldData, error, isPending} = useFetch<UserProfileData, undefined>(`users/profile?user_id=${user_id}`, 'GET');
    
    const [validationError, setValidationError] = useState({
        username: "",
        email: ""
    });

    const [userData, setUserData] = useState<UserDataInterface>({
        id: "",
        username: "",
        email: "",
        password: "",
        role: "user"
    });

    // Submit state for check if there was any error or data were updated
    const [submitState, setSubmitState] = useState({
        updating: false,
        updated: false,
        error: ""
    });

    useEffect(() => {
        if(oldData) {
            setUserData({
                id: oldData.id,
                username: oldData.username,
                email: oldData.email,
                password: "",
                role: oldData.role
            });
        }
    }, [oldData])

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        var validation = "";
        if(name === "username") {
            validation = validateText(value, 20, 3);
        } else if(name === "email") {
            validation = validateText(value, undefined, undefined, EmailRegex);
        }
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setValidationError(prevState => ({
            ...prevState,
            [name]: validation
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        var validate = true;
        Object.entries(validationError).forEach(entry => {
            const [, value] = entry;
            if(value !== "") {
                setSubmitState(prevState => ({
                    ...prevState,
                    error: "Check all the fields and try again, please"
                }));
                validate = false;
            }
        });

        if(validate) {
            setSubmitState(prevState => ({
                ...prevState,
                updating: true
            }));
    
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            
            axios.put(`${process.env.REACT_APP_API_URL}/users/${user_id}`, userData, config)
            .then(res => res.data)
            .then(data => {
                setUserData(prev => ({
                    ...prev,
                    username: data.username,
                    email: data.email,
                    password: ""
                }))
                setSubmitState({
                    updating: false,
                    updated: true,
                    error: ""
                });
            })
            .catch(error => {
                if(axios.isAxiosError(error)) {
                    setSubmitState({
                        updating: false,
                        updated: false,
                        error: error.response?.data.detail
                    });
                } else {
                    setSubmitState({
                        updated: false,
                        updating: false,
                        error: "Something went wrong, please try again"
                    });
                }
            });
        }
    }

    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md border bg-white">
            {
                submitState.updated &&
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold m-2">Data updated</h2>
                    <h3 className="font-bold">Username</h3>
                    <h4 className="font-light">{userData.username}</h4>
                    <h3 className="font-bold">Email</h3>
                    <h4 className="font-light">{userData.email}</h4>
                    <Link to="/profile" className="px-3 py-2 m-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-400 transition duration-100 ease-in-out">Go back</Link>
                </div>
            }
            {
                (isPending || submitState.updating) &&
                <LoadingComponent />
            }
            {
                error && !isPending &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-lg'>Ha ocurrido un error</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
            }
            {
                oldData && !isPending && !submitState.updated &&
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <div className="form-input">
                            <label className="w-[120px]" htmlFor="username">Username:</label>
                            <CustomInput type={"text"} name={"username"} placeholder={"Username"} handleChange={handleChange} required={true} value={oldData.username} />
                        </div> 
                        {validationError.username && <ErrorValidationText error={validationError.username}/>}
                    </div>
                    <div className="form-field">
                        <div className="form-input">
                            <label className="w-[120px]" htmlFor="email">Email:</label>
                            <CustomInput type={"email"} name={"email"} placeholder={"Email"} required={true} handleChange={handleChange} value={oldData.email} />
                        </div>
                        {validationError.email && <ErrorValidationText error={validationError.email}/>}
                    </div>
                    <div className="form-field">
                        <div className="form-input">
                            <label className="w-[120px]" htmlFor="password">Current password:</label>
                            <CustomInput type={"password"} name={"password"} placeholder={"Password"} handleChange={handleChange} required={true} />
                        </div>
                    </div>
                    <SubmitButton loginError={submitState.error} text={"Update user"} />
                </form>
            }
        </div>
    )
}