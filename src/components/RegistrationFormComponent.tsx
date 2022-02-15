import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EmailRegex } from "../helpers/EmailRegex";

export interface UserDataInterface {
    email: string, 
    username: string,
    password: string,
    token?: string
}

interface ErrorText {
    error: string
}

function ErrorValidationText({error}: ErrorText) {
    return (
        <>
            <h4 className="text-red-600 font-light text-sm">{error}</h4>
        </>
    )
}

export const RegistrationFormComponent = () => {
    const [loginError, setLoginError] = useState("");
    const [userData, setUserData] = useState<UserDataInterface>();

    const { register, formState: { errors }, handleSubmit } = useForm<UserDataInterface>();

    const onSubmit: SubmitHandler<UserDataInterface> = async (data) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/users/`, data)
        .then(res => res.data)
        .then(data => {
            setLoginError("");
            setUserData(data)
            console.log(userData);
        })
        .catch(error => {
            if(axios.isAxiosError(error)) {
                setLoginError(error.response?.data['detail'] ?? 'Algo ha ido mal, inténtelo de nuevo más tarde');
            } else {
                setLoginError('Algo ha ido mal, inténtelo de nuevo más tarde');
            }
        })
    };

    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center w-full m-3">
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input type="text" id="username" placeholder="Nombre de usuario" 
                        {...register('username', {
                                required: { value: true, message: 'Introduzca un nombre de usuario'}, 
                                maxLength: { value: 20, message: 'El nombre de usuario debe de ser menor de 20 caracteres'}, 
                                minLength: { value: 3, message: 'El nombre de usuario debe de ser mayor de 3 caracteres'}}
                            )
                        }
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                    />
                    {errors.username?.message && <ErrorValidationText error={errors.username.message}/>}
                </div>
                <div className="flex flex-col items-center w-full m-3">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" placeholder="Email" 
                        {...register('email', {
                                required: { value: true, message: 'Introduzca un correo electrónico'},
                                pattern: { value: EmailRegex, message: 'Introduzca un correo electrónico válido'}}
                            )
                        }
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                    />
                    {errors.email?.message && <ErrorValidationText error={errors.email.message}/>}
                </div>
                <div className="flex flex-col items-center w-full m-3">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" placeholder="Contraseña" 
                        {...register('password', {
                                required: {value: true, message: 'Introduzca una contraseña'},
                                minLength: {value: 6, message: 'La contraseña es demasiado corta'}}
                            )
                        }
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                    />
                    {errors.password?.message && <ErrorValidationText error={errors.password.message}/>}
                </div>
                <div className="flex flex-col items-center w-full mt-5">
                    <button type="submit" className="px-3 py-2 mb-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">
                        <h4 className="text-white font-bold">Registro</h4>
                    </button>
                    {loginError && <ErrorValidationText error={loginError} />}
                </div>
            </form>
        </div>
    )
}