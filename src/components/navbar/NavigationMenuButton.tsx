import { Link } from "react-router-dom";
import { LinkDict } from "./NavigationBar";

export const NavigationMenuButton = ({name, url}: LinkDict) => {
    return(
        <>
            <Link 
            className="font-bold p-2.5 m-3 hover:bg-blue-400 hover:rounded hover:shadow-inner hover:text-white duration-150" 
            to={url}>
                {name}
            </Link>
        </>
    )
}