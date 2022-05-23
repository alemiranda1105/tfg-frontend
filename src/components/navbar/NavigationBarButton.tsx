import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getIconFromName } from "../../helpers/IconHelper";
import { LinkDict } from "./NavigationBar"


export const NavigationBarButton = ({name, url, actual, customStyle}: LinkDict) => {
    const [style, setStyle] = useState(customStyle ?? "font-bold p-2.5 mx-3 my-1 hover:bg-white hover:rounded hover:shadow-inner duration-150");
    const icon = getIconFromName(name);

    useEffect(() => {
        if(actual) {
            setStyle("font-extrabold p-2.5 mx-3 my-1 text-black bg-slate-200 rounded hover:rounded-none hover:shadow-inner hover:bg-white duration-150")
        }
    }, [actual])

    return(
        <>
            <Link 
            className={style} 
            to={url}>
                <div className="flex items-center content-center">
                    {icon}
                    {name}
                </div>
            </Link>
        </>
    )
}