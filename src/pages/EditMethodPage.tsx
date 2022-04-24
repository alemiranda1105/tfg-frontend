import { useState } from "react";
import { useParams } from "react-router-dom";
import { SelectorComponent } from "../components/custom_components/SelectorComponent";
import { MethodFormComponent } from "../components/methods_components/MethodFormComponent";

export function EditMethodPage() {
    const { methodId } = useParams();
    const [withFile, setWithFile] = useState(false);

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="section-title">Update method</h1>
            <h3 className="text-md font-light md:m-0 m-3">Fill all the fields to evaluate and compare you method</h3>
            <div>
                <SelectorComponent negativeTxt={"Update only the data"} positiveTxt={"Update data and results"} status={withFile} setStatus={setWithFile} />
            </div>
            {methodId && <MethodFormComponent methodId={methodId} withMethod={true} withFile={withFile} action={"put"} actionUrl={`methods/${methodId}`}/>}
        </div>
    )
}