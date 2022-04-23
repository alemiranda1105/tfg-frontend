import { Link, useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"
import { ChangelogInterface, NewChangelogInterface } from "../../interface/ChangelogInterface";
import { ErrorMessageComponent } from "../custom_components/ErrorMessageComponent";
import { LoadingComponent } from "../custom_components/LoadingComponent";

interface UploadChangelogProps {
    changelog: NewChangelogInterface,
    method: string,
    changelog_id: string
}

export const UploadChangelogComponent = ({changelog, method, changelog_id}: UploadChangelogProps) => {
    const {isPending, error} = useFetch<ChangelogInterface, NewChangelogInterface>(`changelog/${changelog_id}`, method, changelog);
    const location = useLocation();

    function reload() {
        window.location.reload();
    }

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
                    <h1 className="text-2xl font-bold">Action completed successfully</h1>
                    {
                        (location.pathname !== "/") &&
                        <Link to={`/`} className="font-light p-3">Go back home</Link>
                    }
                    {
                        (location.pathname === "/") &&
                        <button className="font-light p-3" onClick={reload}>Go back home</button>
                    }
                </div>
            }
        </div>
    )
}