import { useParams } from "react-router-dom";


export function UpdateUserProfilePage() {
    const { user_id } = useParams();
    
    return(
        <div>
            Actualizar perfil
        </div>
    )
}