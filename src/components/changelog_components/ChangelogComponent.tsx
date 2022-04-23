import { useContext, useState } from "react"
import { FiEdit, FiX, FiTrash2 } from "react-icons/fi";
import { AuthContext } from "../../auth/AuthContextProvider"
import { ChangelogInterface } from "../../interface/ChangelogInterface"
import { ChangelogForm } from "./ChangelogForm";
import { RemoveChangelogComponent } from "./RemoveChangelogComponent";

interface ChangelogComponentProps {
    changelog: ChangelogInterface,
}

export const ChangelogComponent = ({ changelog }: ChangelogComponentProps) => {
    const { role } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [remove, setRemove] = useState(false);
    
    return(
        <>
            <li className="m-2">
                <strong><i>{changelog.date}:</i></strong> {changelog.description}
                {
                    (role === "admin") && 
                    <>
                        {!remove && 
                        <button 
                        onClick={() => setEditing(!editing)}
                        className="mr-3 ml-2 px-2.5 hover:scale-125 hover:text-blue-500 transition duration-300">
                            {
                                !editing && <FiEdit size={15} />
                            }
                            {
                                editing && <FiX size={15} />
                            }
                        </button>}
                        {!editing &&
                        <button 
                        onClick={() => setRemove(!remove)}
                        className="mr-3 ml-2 hover:scale-125 hover:text-red-500 transition duration-300">
                            {
                                !remove && <FiTrash2 size={15} />
                            }
                            {
                                remove && <FiX size={15}/>
                            }
                        </button>}
                    </>
                }
            </li>
            {
                remove &&
                <div className="flex flex-col items-center w-full">
                    <RemoveChangelogComponent changelog={changelog} changelog_id={changelog.id} />
                </div>
            }
            {
                editing &&
                <div className="flex flex-col items-center w-full">
                    <ChangelogForm changelog={changelog} method={"put"} changelog_id={changelog.id} />
                </div>
            }
        </>
    )
}