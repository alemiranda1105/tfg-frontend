import { useState } from "react";
import { LogOutDialog } from "./LogOutDialog";

export function CloseSessionComponent() {
    const [showModal, setShowModal] = useState(false);

    const displayModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <button onClick={displayModal}>
                Cerrar sesión
            </button>

            {
                showModal && <LogOutDialog handleClose={displayModal} />
            }
        </>
    )
}