import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContextProvider";
import { MethodFormComponent } from "../components/MethodFormComponent"


export const UploadMethodPage = () => {
    const { user_id, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user_id === "" || token === "") {
            navigate("/");
        }
    }, [user_id, token, navigate]);

    return(
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Subir nuevo método</h1>
            <h3 className="text-md font-light md:m-0 m-3">En esta página deberá poner todos los datos para evaluar y comparar su método</h3>
            <MethodFormComponent />
        </div>
    );
}