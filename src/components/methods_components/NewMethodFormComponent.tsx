import { useFetch } from "../../hooks/useFetch";
import { CustomInput } from "../custom_components/CustomInput";
import { ErrorValidationText } from "../custom_components/ErrorValidationText";
import { SubmitButton } from "../custom_components/SubmitButton";
import { MethodInterface } from "../table_components/MethodsTableComponent";


interface MethodFormProps {
    methodId: string | null,
    withFile: boolean
}

// Reusable form component
export const NewMethodFormComponent = ({methodId, withFile}: MethodFormProps) => {
    const { data: oldMethod, isPending, error }  = useFetch<MethodInterface>(`methods/${methodId}`);

    const handleChange = () => {
        console.log("change");
    }

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md shadow-md bg-white">
            {
                isPending &&
                <h3 className="animate-pulse text-lg font-bold">Cargando...</h3>
            }
            {
                error && !isPending &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-lg'>Ha ocurrido un error</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
            }
            {
                oldMethod &&
                <form className="flex flex-col items-center w-full">
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="name">Nombre:</label>
                        <CustomInput type={"text"} name={"name"} placeholder={"Nombre"} handleChange={handleChange} required={true} value={oldMethod.name} />
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="info">Información:</label>
                        <textarea
                        onChange={handleChange}
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                        value={oldMethod.info}
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
                </form>
            }
        </div>
    )

}