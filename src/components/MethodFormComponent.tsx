import axios from "axios";
import React, { useContext, useState } from "react"
import { AuthContext } from "../auth/AuthContextProvider";
import { CustomInput } from "./CustomInput"
import { SubmitButton } from "./SubmitButton";

interface NewMethodInterface {
    info: string,
    link: string,
    name: string,
    user_id: string,
    results: []
}

export const MethodFormComponent = () => {
    // context
    const {user_id, token} = useContext(AuthContext);

    const [uploadError, setUploadError] = useState("");
    const [pending, setPending] = useState(false);

    const [methodData, setMethodData] = useState<NewMethodInterface>({
        info: "",
        link: "",
        name: "",
        user_id: "",
        results: []
    });

    const [file, setFile] = useState<File>();
    
    const handleChange = (e: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setMethodData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files!;
        console.log(file);
        setFile(file![0]);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        setMethodData(prevState => ({
            ...prevState,
            user_id: user_id,
        }));
        console.log(methodData);
        console.log(file);
        var formData = new FormData();
        formData.append('file', file!, `method_${user_id}.zip`);
        formData.append('data', JSON.stringify(methodData));

        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.post(`${process.env.REACT_APP_API_URL}/methods/`, formData, config)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => {
            if(axios.isAxiosError(error)) {
                setPending(false);
                setUploadError(error.message);
            } else {
                setPending(false);
                setUploadError('Algo ha ido mal, inténtelo de nuevo más tarde');
            }
        });
    }

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="name">Nombre:</label>
                    <CustomInput type={"text"} name={"name"} placeholder={"Nombre"} handleChange={handleChange} required={true} />
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="info">Información:</label>
                    <textarea
                    onChange={handleChange}
                    className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                    name="info" id="info" cols={50} rows={10} placeholder="Información"></textarea>
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="link">Enlace a la publicación:</label>
                    <CustomInput type={"text"} name={"link"} placeholder={"Nombre"} handleChange={handleChange} required={true} />
                </div>
                <div className="flex flex-col items-center w-full m-3"> 
                    <label htmlFor="file">Fichero con los resultados a comparar:</label>
                    <CustomInput type={"file"} name={"file"} accept={"zip,application/zip,application/x-zip,application/x-zip-compressed"} placeholder={""} handleChange={handleFileChange} required={true} />
                    <h6 className="text-sm font-light m-1">Solo se admiten ficheros en formato .zip</h6>
                </div>

                <SubmitButton loginError={uploadError} text="Subir método"/>
            </form>
        </div>
    )
}