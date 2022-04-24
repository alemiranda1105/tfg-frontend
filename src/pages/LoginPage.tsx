import { Link } from "react-router-dom"
import { LoginFormComponent } from "../components/auth_components/LoginFormComponent"


export const LoginPage = () => {
    return(
        <div className="flex flex-col items-center">
            <h1 className="section-title">Login</h1>
            <LoginFormComponent />
            <Link to="/signup" className="font-light text-lg m-2 hover:text-blue-700">Join the platform clicking here</Link>
        </div>
    )
}