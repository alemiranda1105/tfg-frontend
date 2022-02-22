import axios from "axios";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { setCookie } from "react-use-cookie";
import { AuthContext } from "../auth/AuthContextProvider";
import { EmailRegex } from "../helpers/EmailRegex";
import { ErrorValidationText } from "./ErrorValidationText";
import { UserDataInterface } from "./RegistrationFormComponent";
import { SelectorComponent } from "./SelectorComponent";
import { SubmitButton } from "./SubmitButton";
import { WelcomeUserComponent } from "./WelcomeUserComponent";

interface LoginData {
    username?: string,
    email?: string,
    password: string
}

export const LoginFormComponent = () => {
    // Context
    const { setId, setToken } = useContext(AuthContext);

    // States
    const[loginEmail, setLoginEmail] = useState(false);

    const [loginError, setLoginError] = useState("");
    const [userData, setUserData] = useState<UserDataInterface>();

    // Form validation
    const { register, formState: { errors }, handleSubmit } = useForm<LoginData>();
    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, data)
        .then(res => res.data as UserDataInterface)
        .then(data => {
            if(!data.token || !data.id) {
                throw Error("Algo ha ido mal, inténtelo de nuevo")
            } else {
                setLoginError("");
                setUserData(data);
                data.token && setCookie('token', data.token, { days: 30 });
                data.id && setCookie('user_id', data.id, { days: 30 });
                data.id && setId(data.id);
                data.token && setToken(data.token);
            }
        })
        .catch(error => {
            if(axios.isAxiosError(error)) {
                setLoginError(error.response?.data['detail'] ?? 'Algo ha ido mal, inténtelo de nuevo más tarde');
            } else {
                setLoginError('Algo ha ido mal, inténtelo de nuevo más tarde');
            }
        })
    }

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            {userData && !loginError && <WelcomeUserComponent data={userData} />}
            {!userData &&
            <>
                <SelectorComponent negativeTxt={"Nombre de usuario"} positiveTxt={"Correo electrónico"} status={loginEmail} setStatus={setLoginEmail} />
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit(onSubmit)}>
                    {!loginEmail &&
                        <div className="flex flex-col items-center w-full m-3">
                            <label htmlFor="username">Nombre de usuario:</label>
                            <input type="text" id="username" placeholder="Nombre de usuario" 
                                className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                                {...register('username', {
                                    required: { value: true, message: 'Introduzca un nombre de usuario'}, 
                                    maxLength: { value: 20, message: 'El nombre de usuario debe de ser menor de 20 caracteres'}, 
                                    minLength: { value: 3, message: 'El nombre de usuario debe de ser mayor de 3 caracteres'}}
                                )}
                            />
                            {errors.username?.message && <ErrorValidationText error={errors.username.message}/>}
                        </div>
                    }
                    {loginEmail &&
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
                    }
                    <div className="flex flex-col items-center w-full m-3">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" placeholder="Contraseña" 
                            className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                            {...register('password', {
                                required: {value: true, message: 'Introduzca una contraseña'},
                                minLength: {value: 6, message: 'La contraseña es demasiado corta'}}
                            )}
                        />
                        {errors.password?.message && <ErrorValidationText error={errors.password.message}/>}
                    </div>

                    <SubmitButton loginError={loginError} />

                </form>
            </>
            }
            
        </div>
    )
}