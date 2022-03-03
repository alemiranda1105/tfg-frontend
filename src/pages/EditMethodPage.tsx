import { useParams } from "react-router-dom";
import { NewMethodFormComponent } from "../components/methods_components/NewMethodFormComponent";


export function EditMethodPage() {
    const { methodId } = useParams();

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Editar método</h1>
            <h3 className="text-md font-light md:m-0 m-3">En esta página deberá poner todos los datos para evaluar y comparar su método</h3>
            {methodId && <NewMethodFormComponent methodId={methodId} withFile={true} />}
        </div>
    )
}