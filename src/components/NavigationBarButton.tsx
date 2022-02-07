import { Link } from "react-router-dom"
import { LinkDict } from "./NavigationBar"

export const NavigationBarButton = ({name, url}: LinkDict) => {
    return(
        <>
            <Link 
            className="font-bold p-2.5 mx-3 my-1 hover:bg-blue-400 hover:rounded hover:shadow-inner hover:text-white duration-150" 
            to={url}>
                {name}
            </Link>
        </>
    )
}