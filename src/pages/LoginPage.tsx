import { LoginFormComponent } from "../components/LoginFormComponent"


export const LoginPage = () => {
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Iniciar sesión</h1>
            <LoginFormComponent />
        </div>
    )
}