import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"
import { ContentInterface, NewContentInterface } from "../../interface/ContentInterface"
import { ErrorMessageComponent } from "../custom_components/ErrorMessageComponent";
import { LoadingComponent } from "../custom_components/LoadingComponent";

interface UploadContentProps {
    content: NewContentInterface,
    method: string,
    content_id: string
}

export const UploadContentComponent = ({content, method, content_id}: UploadContentProps) => {
    const {isPending, error} = useFetch<ContentInterface, NewContentInterface>(`content/${content_id}`, method, content);
    return (
        <div className="flex flex-col items-center content-center m-3 p-2.5">
            {
                isPending &&
                <LoadingComponent />
            }
            {
                !isPending && error &&
                <ErrorMessageComponent msg={error} />
            }
            {
                !isPending && !error &&
                <div className="flex flex-col items-center content-center m-3 p-2.5">
                    <h1 className="text-2xl font-bold">Uploaded successfully</h1>
                    <Link to={`/`} className="font-light p-3">Go back home</Link>
                </div>
            }
        </div>
    )
}