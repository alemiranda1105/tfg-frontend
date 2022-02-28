import { RegistrationFormComponent } from "../components/auth_components/RegistrationFormComponent"

export const SignUpPage = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Registro</h1>
            <RegistrationFormComponent />
        </div>
    )
}