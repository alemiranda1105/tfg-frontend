import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContextProvider";
import { validateText } from "../helpers/FormValidationHelper";
import { CustomInput } from "./CustomInput"
import { ErrorValidationText } from "./ErrorValidationText";
import { MethodInterface } from "./MethodsTableComponent";
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

    const [uploadedMethod, setUploadedMethod] = useState("");
    const [methodData, setMethodData] = useState<NewMethodInterface>({
        info: "",
        link: "",
        name: "",
        user_id: "",
        results: []
    });

    const [validationError, setValidationError] = useState({
        info: "",
        link: "",
        name: "",
        file: ""
    });

    const [file, setFile] = useState<File>();

    const checkValidation = () => {
        var validate = true;
        Object.entries(validationError).forEach(entry => {
            const [, value] = entry;
            if(value !== "") {
                setUploadError("Revise todos los campos e inténtelo de nuevo");
                validate = false;
                return;
            }
        });
        return validate;
    }
    
    const handleChange = (e: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;

        // Validation
        var validation: string = "";
        if(name === "name") {
            validation = validateText(value, 25, 3);
        } else if(name === "info") {
            validation = validateText(value, 200, 5);
        } else if(name === "link") {
            validation = validateText(value, 50, 3);
        }

        setValidationError(prevState => ({
            ...prevState,
            [name]: validation
        }));

        setMethodData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.files) {
            const file = e.currentTarget.files;
            setFile(file[0]);
        } else {
            setValidationError(prevState => ({
                ...prevState,
                file: "Introduzca un archivo válido"
            }));
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(checkValidation()) {
            setPending(true);
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
            .then(data => {
                setUploadedMethod(data.id);
                setPending(false);
            })
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

    }

    useEffect(() => {
        setMethodData(prevState => ({
            ...prevState,
            user_id: user_id
        }));
    }, [user_id]);

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md shadow-md bg-white">
            {pending &&
                <div className="flex flex-col items-center">
                    <h3 className="animate-pulse text-2xl font-bold">Subiendo y evaluando método...</h3>
                    <h4>Puede cerrar esta página, en unos minutos su método estará evaluado</h4>
                </div>
            }
            {!pending && !uploadError && uploadedMethod &&
            <>
                <h1>Método subido con éxito</h1>
                <Link to={`/method_details/${uploadedMethod}`} className="font-light p-3">Ver método y resultados</Link>
            </>
            }
            {!pending && !uploadedMethod &&
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="name">Nombre:</label>
                        <CustomInput type={"text"} name={"name"} placeholder={"Nombre"} handleChange={handleChange} required={true} />
                        {validationError.name && <ErrorValidationText error={validationError.name}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="info">Información:</label>
                        <textarea
                        onChange={handleChange}
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                        name="info" id="info" cols={50} rows={10} placeholder="Información"></textarea>
                        {validationError.info && <ErrorValidationText error={validationError.info}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="link">Enlace a la publicación:</label>
                        <CustomInput type={"text"} name={"link"} placeholder={"Nombre"} handleChange={handleChange} required={true} />
                        {validationError.link && <ErrorValidationText error={validationError.link}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="file">Fichero con los resultados a comparar:</label>
                        <CustomInput type={"file"} name={"file"} accept={"zip,application/zip,application/x-zip,application/x-zip-compressed"} placeholder={""} handleChange={handleFileChange} required={true} />
                        <h6 className="text-sm font-light m-1">Solo se admiten ficheros en formato .zip</h6>
                        {validationError.file && <ErrorValidationText error={validationError.file}/>}
                    </div>

                    <SubmitButton loginError={uploadError} text="Subir método"/>
                </form>
            }
        </div>
    )
}