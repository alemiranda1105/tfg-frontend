import React, { useState } from "react";
import { EmailRegex } from "../../helpers/EmailRegex";
import { validateText } from "../../helpers/FormValidationHelper";
import { useFetch } from "../../hooks/useFetch";
import { CustomInput } from "../custom_components/CustomInput"
import { ErrorValidationText } from "../custom_components/ErrorValidationText";
import { UserProfileData } from "./UserDataComponent";


interface UserForm {
    user_id: string
}

export const UpdateUserForm = ({user_id}: UserForm) => {
    const {data: oldData, error, isPending} = useFetch<UserProfileData, undefined>(`users/profile?user_id=${user_id}`, 'GET');
    
    const [validationError, setValidationError] = useState({
        username: "",
        email: ""
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        var validation = "";
        if(name === "username") {
            validation = validateText(value, 20, 3);
        } else if(name === "email") {
            validation = validateText(value, undefined, undefined, EmailRegex);
        }
        setValidationError(prevState => ({
            ...prevState,
            [name]: validation
        }));
    };

    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md shadow-md bg-white">
            {
                oldData &&
                <form className="flex flex-col items-center w-full">
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="name">Nombre de usuario:</label>
                        <CustomInput type={"text"} name={"username"} placeholder={"Nombre"} handleChange={handleChange} required={true} value={oldData.username} />
                        {validationError.username && <ErrorValidationText error={validationError.username}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="info">Correo electrónico:</label>
                        <CustomInput type={"email"} name={"email"} placeholder={"Correo electrónico"} required={true} handleChange={handleChange} value={oldData.email} />
                        {validationError.email && <ErrorValidationText error={validationError.email}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="link">Contraseña actual:</label>
                        <CustomInput type={"password"} name={"password"} placeholder={"Contraseña"} handleChange={handleChange} required={true} />
                    </div>
                </form>
            }
        </div>
    )
}