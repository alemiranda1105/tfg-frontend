import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContextProvider";

interface ModalInterface {
    handleClose: () => void
}

export function LogOutDialog({ handleClose }: ModalInterface) {
    const { setId, setToken, setUsername } = useContext(AuthContext);
    const logout = () => {
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setId("");
        setToken("");
        setUsername("");
    };

    return (
        <div className="md:fixed top-0 left-0 flex flex-col text-black justify-center items-center w-full h-full md:bg-gray-800/60">
            <div className="flex flex-col items-center content-center place-content-between w-full md:w-fit h-1/4 rounded-md shadow-md bg-white/60 md:bg-white p-3">
                <h2 className="text-2xl font-bold">
                    ¿Seguro que desea cerrar sesión?
                </h2>
                <h3 className="text-md font-light">
                    Para volver a utilizar los servicios deberá iniciar sesión de nuevo
                </h3>
                <div className="flex justify-center items-center w-full content-between">
                    <button
                        onClick={logout}
                        className="px-10 py-3 bg-orange-400 active:bg-orange-400/40 rounded-md m-4 font-semibold text-white shadow-lg hover:shadow-none"
                    >
                        Sí
                    </button>

                    <button
                        onClick={handleClose}
                        className="px-10 py-3 bg-blue-500 active:bg-blue-500/40 rounded-md m-4 font-semibold text-white shadow-lg hover:shadow-none"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );

}
