import { useState } from "react";
import { useParams } from "react-router-dom";
import { NewMethodFormComponent } from "../components/methods_components/NewMethodFormComponent";

interface SelectButtonProps {
    text: string,
    click: () => void
}

export function EditMethodPage() {
    const { methodId } = useParams();
    const [withFile, setWithFile] = useState(false);

    const SelectButton = ({text, click}: SelectButtonProps) => {
        return (
            <button 
            onClick={() => click()}
            className="px-3 py-2 m-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">
                {text}
            </button>
        )
    }

    const handleClick = (state: boolean) => {
        setWithFile(state);
    }

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Editar método</h1>
            <h3 className="text-md font-light md:m-0 m-3">En esta página deberá poner todos los datos para evaluar y comparar su método</h3>
            <div>
                {withFile && <SelectButton text={"Editar solo los datos"} click={() => handleClick(false)}/>}
                {!withFile && <SelectButton text={"Editar datos y/o archivos"} click={() => handleClick(true)}/>}
            </div>
            {methodId && <NewMethodFormComponent methodId={methodId} withFile={withFile} action={"put"} actionUrl={`methods/${methodId}`}/>}
        </div>
    )
}