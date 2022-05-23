import { useContext, useState } from "react";
import { ContentInterface } from "../../interface/ContentInterface";
import { FiEdit, FiX, FiTrash2 } from "react-icons/fi";
import { ContentForm } from "./ContentForm";
import { AuthContext } from "../../auth/AuthContextProvider";
import { RemoveConfirmationComponent } from "./RemoveConfirmationComponent";

import '../../styles/ContentComponent.css';

interface ContentComponentProps {
    content: ContentInterface
}


export const ContentComponent = ({ content }: ContentComponentProps) => {
    const { role } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [remove, setRemove] = useState(false);

    return (
        <section className="my-5 flex flex-col items-start border-b-2 w-3/4 border-b-black">
            <div className="flex items-center content-center justify-center">
                <h2 className="section-title">
                    {content.title}
                </h2>
                {
                    (role === "admin") && 
                    <>
                        {!remove && 
                        <button 
                        aria-label="Edit button"
                        onClick={() => setEditing(!editing)}
                        className="mr-3 ml-2 px-2.5 hover:scale-125 hover:text-blue-500 transition duration-300">
                            {
                                !editing && <FiEdit size={22} />
                            }
                            {
                                editing && <FiX size={22} />
                            }
                        </button>}
                        {!editing &&
                        <button
                        aria-label="Delete button"
                        onClick={() => setRemove(!remove)}
                        className="mr-3 ml-2 hover:scale-125 hover:text-red-500 transition duration-300">
                            {
                                !remove && <FiTrash2 size={22} />
                            }
                            {
                                remove && <FiX size={22}/>
                            }
                        </button>}
                    </>
                }
            </div>
            {
                remove &&
                <div className="flex flex-col items-center w-full">
                    <RemoveConfirmationComponent content_id={content.id} content={content} />
                </div>
            }
            {
                !editing && !remove &&
                <div className="p-3 text-left w-full break-words content-container" dangerouslySetInnerHTML={{__html: content.text}}/>
            }
            {
                editing &&
                <div className="flex flex-col items-center w-full">
                    <ContentForm content={content} method={"put"} content_id={content.id} />
                </div>
            }
        </section>
    )
}