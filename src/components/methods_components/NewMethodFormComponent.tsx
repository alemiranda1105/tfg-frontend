import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContextProvider";
import { useFetch } from "../../hooks/useFetch";
import { CustomInput } from "../custom_components/CustomInput";
import { SubmitButton } from "../custom_components/SubmitButton";
import { UploadMethodComponent } from "../custom_components/UploadComponent";
import { MethodInterface, Results } from "../table_components/MethodsTableComponent";


interface MethodFormProps {
    methodId: string | "",
    withFile: boolean,
    action: string,
    actionUrl: string
}

export interface NewMethodInterface {
    id: string | ""
    info: string,
    link: string,
    name: string,
    user_id: string,
    results: Results | []
}

// Reusable form component
export const NewMethodFormComponent = ({methodId, withFile, action, actionUrl}: MethodFormProps) => {
    const { user_id } = useContext(AuthContext);
    const { data: oldMethod, isPending, error }  = useFetch<MethodInterface, undefined>(`methods/${methodId}`);

    const [submitted, setSubmitted] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const [submitData, setSubmitData] = useState<NewMethodInterface>({
        id: "",
        info: "",
        link: "",
        name: "",
        user_id: "",
        results: []
    });
    const [formData, setFormData] = useState<FormData>();
    const [newData, setNewData] = useState<MethodInterface>();

    const handleChange = (e: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setSubmitData(prevState => ({
            ...prevState,
            [name]: value
        }));
        var newFormData = new FormData();
        newFormData.append('data', JSON.stringify(submitData));
        setFormData(newFormData);
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setUploading(true);
        console.log('submitted');
    }

    useEffect(() => {
        setSubmitData(prevState => ({
            ...prevState,
            user_id: user_id
        }));
        if(submitError !== "") {
            setSubmitted(false);
        }
    }, [user_id])

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md shadow-md bg-white">
            {
                !uploading && !submitError && newData &&
                <>
                    <h1>Método subido con éxito</h1>
                    <Link to={`/method_details/${newData.id}`} className="font-light p-3">Ver método y resultados</Link>
                </>
            }
            {
                uploading && formData &&
                <UploadMethodComponent url={actionUrl} method={action} uploadData={formData} setData={setNewData} setUploading={setUploading} setError={setSubmitError} />
            }
            {
                error && !isPending &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-lg'>Ha ocurrido un error</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
            }
            {
                oldMethod && !submitted &&
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="name">Nombre:</label>
                        <CustomInput type={"text"} name={"name"} placeholder={"Nombre"} handleChange={handleChange} required={true} value={oldMethod.name} />
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="info">Información:</label>
                        <textarea
                        onChange={handleChange}
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                        defaultValue={oldMethod.info}
                        name="info" id="info" cols={50} rows={10} placeholder="Información">
                        </textarea>
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="link">Enlace a la publicación:</label>
                        <CustomInput type={"text"} name={"link"} placeholder={"Nombre"} handleChange={handleChange} required={true} value={oldMethod.link} />
                    </div>
                    {
                        withFile &&
                        <div className="flex flex-col items-center w-full m-3"> 
                            <label htmlFor="file">Fichero con los resultados a comparar:</label>
                            <CustomInput type={"file"} name={"file"} accept={"zip,application/zip,application/x-zip,application/x-zip-compressed"} placeholder={""} handleChange={handleChange} required={true} />
                            <h6 className="text-sm font-light m-1">Solo se admiten ficheros en formato .zip</h6>
                        </div>
                    }

                    <SubmitButton loginError={submitError} text="Subir método"/>
                </form>
            }
        </div>
    )

}