import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkDict } from "./NavigationBar";

export const NavigationMenuButton = ({name, url, actual}: LinkDict) => {
    const [style, setStyle] = useState("font-bold p-2.5 m-3 w-full hover:bg-white hover:rounded hover:shadow-inner duration-150");

    useEffect(() => {
        if(actual) {
            setStyle("p-2.5 m-3 w-full bg-slate-200 font-extrabold hover:bg-white rounded hover:shadow-inner duration-150");
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