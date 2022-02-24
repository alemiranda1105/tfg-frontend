import { NewRegistrationForm } from "../components/NewRegistrationForm"
import { RegistrationFormComponent } from "../components/RegistrationFormComponent"

export const SignUpPage = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Registro</h1>
            <NewRegistrationForm />
        </div>
    )
}