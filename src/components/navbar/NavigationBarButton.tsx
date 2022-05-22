import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LinkDict } from "./NavigationBar"

export const NavigationBarButton = ({name, url, actual}: LinkDict) => {
    const [style, setStyle] = useState("font-bold p-2.5 mx-3 my-1 hover:bg-white hover:rounded hover:shadow-inner duration-150");

    useEffect(() => {
        let newStyle = style;
        if(actual) {
            newStyle = "font-extrabold p-2.5 mx-3 my-1 text-black bg-slate-200 rounded hover:rounded-none hover:shadow-inner hover:bg-white duration-150"
        }
        if(name === "Login") {
            newStyle += " rounded-lg bg-blue-300 hover:bg-white"
        }
        if(name === "Sign up") {
            newStyle += " rounded-lg border-2 border-blue-500 hover:bg-blue-500"
        }
        setStyle(newStyle)
    }, [actual, name, style])

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