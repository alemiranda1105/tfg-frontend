import { MethodFormComponent } from "../components/methods_components/MethodFormComponent";


export const UploadMethodPage = () => {
    return(
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Subir nuevo método</h1>
            <h3 className="text-md font-light md:m-0 m-3">En esta página deberá poner todos los datos para evaluar y comparar su método</h3>
            <MethodFormComponent methodId={""} withMethod={false} withFile={true} action={"post"} actionUrl={"methods/"} />
        </div>
    );
}