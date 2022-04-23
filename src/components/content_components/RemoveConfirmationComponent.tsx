import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { ContentInterface } from "../../interface/ContentInterface";
import { UploadContentComponent } from "./UploadContentComponent";

interface RemoveContentProps {
    content: ContentInterface
    content_id: string
}

export const RemoveConfirmationComponent = ({content, content_id}: RemoveContentProps) => {
    const [remove, setRemove] = useState(false);

    return (
        <div className="flex flex-col items-center">
            {
                !remove &&
                <>
                    <h3 className="text-3xl font-bold text-red-500">Attention!</h3>
                    <h4 className="text-lg font-semibold">You are about to delete this content</h4>
                    <button 
                    onClick={() => setRemove(true)}
                    className="flex items-center justify-center bg-red-500 rounded px-2 text-white font-bold m-2">
                        <h3 className="m-2">Delete</h3>
                        <FiTrash2 />
                    </button>
                </>
            }
            {
                remove &&
                <UploadContentComponent content={content} method={"delete"} content_id={content_id} />
            }
        </div>
    )
} 