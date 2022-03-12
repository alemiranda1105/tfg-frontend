import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LinkDict } from "./NavigationBar"

export const NavigationBarButton = ({name, url, actual}: LinkDict) => {
    const [style, setStyle] = useState("font-bold p-2.5 mx-3 my-1 hover:bg-blue-400 hover:rounded hover:shadow-inner hover:text-white duration-150");

    useEffect(() => {
        if(actual) {
            setStyle("font-bold p-2.5 mx-3 my-1 text-blue-500 bg-white rounded hover:rounded-none hover:shadow-inner hover:bg-sky-50 duration-150");
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