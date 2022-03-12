import { useState } from "react";
import { LogOutDialog } from "./LogOutDialog";

export function CloseSessionComponent() {
    const [showModal, setShowModal] = useState(false);

    const displayModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <button
            className="font-bold p-2.5 mx-3 my-1 hover:bg-red-500 hover:rounded hover:shadow-inner hover:text-white duration-150"
            onClick={displayModal}
            >
                Cerrar sesión
            </button>

            {
                showModal && <LogOutDialog handleClose={displayModal} />
            }
        </>
    )
}