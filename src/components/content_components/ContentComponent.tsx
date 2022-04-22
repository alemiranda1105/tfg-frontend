import { useState } from "react";
import { ContentInterface } from "../../interface/ContentInterface";
import { FiEdit, FiX } from "react-icons/fi";
import { ContentForm } from "./ContentForm";

interface ContentComponentProps {
    content: ContentInterface
}


export const ContentComponent = ({ content }: ContentComponentProps) => {
    const [editing, setEditing] = useState(false);

    return (
        <section className="my-5 flex flex-col items-start border-b-2 w-11/12 border-b-black">
            <div className="flex items-center content-center justify-center">
                <h2 className="section-title">
                    {content.title}
                </h2>
                <button 
                onClick={() => setEditing(!editing)}
                className="mx-3 px-2.5 hover:scale-150 hover:text-blue-500 transition duration-300">
                    {
                        !editing && <FiEdit />
                    }
                    {
                        editing && <FiX />
                    }
                </button>
            </div>
            {
                !editing &&
                <div className="p-3 text-left">
                    <p>{content.text}</p>
                </div>
            }
            {
                editing &&
                <div className="flex flex-col items-center w-full">
                    <ContentForm content={content || content} method={"put"} content_id={content.id} />
                </div>
            }
        </section>
    )
}