import { useState } from "react";
import { getIconFromName } from "../../helpers/IconHelper";
import { LogOutDialog } from "./LogOutDialog";

export function CloseSessionComponent() {
    const [showModal, setShowModal] = useState(false);
    const icon = getIconFromName("Log out")

    const displayModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <button
            className="font-bold p-2.5 mx-3 my-1 hover:bg-red-500 hover:rounded hover:shadow-inner hover:text-white duration-150"
            onClick={displayModal}
            >
                <div className="flex items-center content-center">
                    {icon}
                    Log out
                </div>
            </button>

            {
                showModal && <LogOutDialog handleClose={displayModal} />
            }
        </>
    )
}