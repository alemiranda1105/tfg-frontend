import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailRegex } from "../../helpers/EmailRegex";
import { validateText } from "../../helpers/FormValidationHelper";
import { useFetch } from "../../hooks/useFetch";
import { UserDataInterface } from "../auth_components/RegistrationFormComponent";
import { CustomInput } from "../custom_components/CustomInput"
import { ErrorValidationText } from "../custom_components/ErrorValidationText";
import { SubmitButton } from "../custom_components/SubmitButton";
import { UserProfileData } from "./UserDataComponent";


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
        username: "",
        email: "",
        password: ""
    });

    // Submit state for check if there was any error or data were updated
    const [submitState, setSubmitState] = useState({
        updated: true,
        error: ""
    });

    useEffect(() => {
        if(oldData) {
            setUserData({
                username: oldData.username,
                email: oldData.email,
                password: ""
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

        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.put(`${process.env.REACT_APP_API_URL}/users/${user_id}`, userData, config)
        .then(res => res.data)
        .then(data => {
            setUserData({
                username: data.username,
                email: data.email,
                password: ""
            });
            setSubmitState({
                updated: true,
                error: ""
            });
        })
        .catch(error => {
            if(axios.isAxiosError(error)) {
                setSubmitState({
                    updated: false,
                    error: error.response?.data.detail
                });
            } else {
                setSubmitState({
                    updated: false,
                    error: "Algo ha ido mal, inténtelo de nuevo"
                });
            }
        });
    }

    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md shadow-md bg-white">
            {
                submitState.updated &&
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold m-2">Datos actualizados</h2>
                    <h3 className="font-bold">Nombre de usuario</h3>
                    <h4 className="font-light">{userData.username}</h4>
                    <h3 className="font-bold">Correo electrónico</h3>
                    <h4 className="font-light">{userData.email}</h4>
                    <Link to="/profile" className="px-3 py-2 m-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-400 transition duration-100 ease-in-out"> Volver al perfil</Link>
                </div>
            }
            {
                isPending &&
                <div className="flex flex-col items-center">
                    <h3 className="animate-pulse text-2xl font-bold">Cargando...</h3>
                </div>
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
                    <SubmitButton loginError={submitState.error} text={"Actualizar usuario"} />
                </form>
            }
        </div>
    )
}