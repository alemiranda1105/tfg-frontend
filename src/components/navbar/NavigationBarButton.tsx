import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LinkDict } from "./NavigationBar"

export const NavigationBarButton = ({name, url, actual}: LinkDict) => {
    const [style, setStyle] = useState("font-bold p-2.5 mx-3 my-1 hover:bg-white hover:rounded hover:shadow-inner duration-150");

    useEffect(() => {
        if(actual) {
            setStyle("font-extrabold p-2.5 mx-3 my-1 text-black bg-slate-200 rounded hover:rounded-none hover:shadow-inner hover:bg-white duration-150");
        }
    }, [actual])

    return(
        <>
            <Link 
            className={style} 
            to={url}>
                {name}
            </Link>
        </>
    )
}