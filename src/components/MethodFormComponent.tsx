import React, { useState } from "react"
import { CustomInput } from "./CustomInput"
import { SubmitButton } from "./SubmitButton";

interface NewMethodInterface {
    id: string,
    info: string,
    link: string,
    name: string,
    user_id: string,
    results: []
}

export const MethodFormComponent = () => {
    const [methodData, setMethodData] = useState<NewMethodInterface>({
        id: "",
        info: "",
        link: "",
        name: "",
        user_id: "",
        results: []
    });
    
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        console.log(name + '->' + value);
    }

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            <form className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="name">Nombre:</label>
                    <CustomInput type={"text"} name={"name"} placeholder={"Nombre"} handleChange={handleChange} required={true} />
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="info">Información:</label>
                    <textarea 
                    className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                    name="info" id="info" cols={50} rows={10} placeholder="Información"></textarea>
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="name">Enlace a la publicación:</label>
                    <CustomInput type={"text"} name={"name"} placeholder={"Nombre"} handleChange={handleChange} required={true} />
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="results">Fichero con los resultados a comparar:</label>
                    <CustomInput type={"file"} name={"results"} accept={"zip,application/zip,application/x-zip,application/x-zip-compressed"} placeholder={""} handleChange={handleChange} required={true} />
                    <h6 className="text-sm font-light m-1">Solo se admiten ficheros en formato .zip</h6>
                </div>

                <SubmitButton loginError={""} text="Subir método"/>
            </form>
        </div>
    )
}