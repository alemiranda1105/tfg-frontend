import { useForm, SubmitHandler } from "react-hook-form";
import { EmailRegex } from "../helpers/EmailRegex";

interface UserRegistrationData {
    email: string, 
    username: string,
    password: string
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
    const { register, formState: { errors }, handleSubmit } = useForm<UserRegistrationData>();
    const onSubmit: SubmitHandler<UserRegistrationData> = data => console.log(data);

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
                <div>
                    <button type="submit" className="px-3 py-2 mt-5 rounded-md bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">
                        <h4 className="text-white font-bold">Registro</h4>
                    </button>
                </div>
            </form>
        </div>
    )
}