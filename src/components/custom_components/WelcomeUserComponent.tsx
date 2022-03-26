import { Link } from "react-router-dom";
import { UserDataInterface } from "../auth_components/RegistrationFormComponent";

interface LoggedUserData {
    data: UserDataInterface
}

export function WelcomeUserComponent({data}: LoggedUserData) {

    return(
        <>
           <h3 className="text-xl font-semibold">
               Welcome, {data.username}
            </h3>
           <Link 
            to={"/"} 
            className="px-3 py-2 m-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">
               Home
            </Link>
        </>
    )
}