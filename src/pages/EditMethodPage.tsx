import { useParams } from "react-router-dom";


export function EditMethodPage() {
    const { methodId } = useParams();

    return (
        <div>
            Edit {methodId}
        </div>
    )
}