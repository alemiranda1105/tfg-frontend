import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CloseSessionComponent } from "../auth_components/CloseSessionComponent";
import { LinkDict } from "./NavigationBar"

import '../../styles/ProfileBarButton.css';

export const ProfileBarButton = ({name, url, actual}: LinkDict) => {
    const [style, setStyle] = useState("dropbtn font-bold p-2.5 mx-3 my-1 hover:bg-blue-400 hover:rounded hover:shadow-inner hover:text-white duration-150");

    useEffect(() => {
        if(actual) {
            setStyle("dropbtn font-bold p-2.5 mx-3 my-1 text-blue-500 bg-white rounded hover:rounded-none hover:shadow-inner hover:bg-sky-50 duration-150");
        }
    }, [actual])

    return(
        <div className="dropdown flex flex-col items-center text-center hover:bg-white hover:rounded hover:text-blue-500 duration-300 ease-in-out">
            <h4 className={style}>Perfil</h4>
            <div className="dropdown-content">
                <Link className={style} to={url}>{name}</Link>
                <CloseSessionComponent />
            </div>
        </div>
    )
}