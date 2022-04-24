import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContextProvider";
import { LoginFormComponent } from "../components/auth_components/LoginFormComponent";
import { MethodFormComponent } from "../components/methods_components/MethodFormComponent";


export const UploadMethodPage = () => {
    const { user_id, token } = useContext(AuthContext);

    
    return(
        <div className="flex flex-col items-center text-center">
            <h1 className="section-title">Upload new method</h1>
            {
                user_id && token &&
                <>
                    <MethodFormComponent methodId={""} withMethod={false} withFile={true} action={"post"} actionUrl={"methods/"} />
                </>
            }
            {
                !user_id && !token &&
                <>
                    <h2 className="text-xl font-light">Before submitting a method, you must be logged</h2>
                    <LoginFormComponent />
                    <Link to="/signup" className="font-light text-lg m-2 hover:text-blue-700">Join the platform clicking here</Link>
                </>
            }
        </div>
    );
}