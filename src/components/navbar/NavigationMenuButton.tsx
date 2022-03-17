import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkDict } from "./NavigationBar";

export const NavigationMenuButton = ({name, url, actual}: LinkDict) => {
    const [style, setStyle] = useState("font-bold p-2.5 m-3 w-full hover:bg-blue-400 hover:rounded hover:shadow-inner hover:text-white duration-150");

    useEffect(() => {
        if(actual) {
            setStyle("font-bold p-2.5 m-3 w-full bg-white text-blue-500 hover:bg-blue-400 rounded hover:shadow-inner hover:text-white duration-150");
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