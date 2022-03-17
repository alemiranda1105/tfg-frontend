import { Link } from "react-router-dom"
import { LoginFormComponent } from "../components/auth_components/LoginFormComponent"


export const LoginPage = () => {
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Iniciar sesión</h1>
            <LoginFormComponent />
            <Link to="/signup" className="font-light text-lg m-2 hover:text-blue-700">Regístrese aquí</Link>
        </div>
    )
}