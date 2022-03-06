import { useState } from "react";
import { useParams } from "react-router-dom";
import { SelectorComponent } from "../components/custom_components/SelectorComponent";
import { NewMethodFormComponent } from "../components/methods_components/NewMethodFormComponent";

export function EditMethodPage() {
    const { methodId } = useParams();
    const [withFile, setWithFile] = useState(false);

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Editar método</h1>
            <h3 className="text-md font-light md:m-0 m-3">En esta página deberá poner todos los datos para evaluar y comparar su método</h3>
            <div>
                <SelectorComponent negativeTxt={"Editar solo los datos"} positiveTxt={"Editar datos y resultados"} status={withFile} setStatus={setWithFile} />
            </div>
            {methodId && <NewMethodFormComponent methodId={methodId} withMethod={true} withFile={withFile} action={"put"} actionUrl={`methods/${methodId}`}/>}
        </div>
    )
}