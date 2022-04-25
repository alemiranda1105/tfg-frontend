import { RegistrationFormComponent } from "../components/auth_components/RegistrationFormComponent"

export const SignUpPage = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="section-title">Sign up</h1>
            <RegistrationFormComponent />
        </div>
    )
}