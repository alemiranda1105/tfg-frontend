import { MethodFormComponent } from "../components/methods_components/MethodFormComponent";


export const UploadMethodPage = () => {
    return(
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Upload new method</h1>
            <MethodFormComponent methodId={""} withMethod={false} withFile={true} action={"post"} actionUrl={"methods/"} />
        </div>
    );
}