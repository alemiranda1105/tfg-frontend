import { Link } from "react-router-dom"
import { LinkDict } from "./NavigationBar"

export const NavigationBarButton = ({name, url}: LinkDict) => {
    return(
        <>
            <Link 
            className="font-bold p-2.5 mx-5 hover:scale-110 hover:my-2 hover:bg-blue-500 hover:rounded hover:shadow hover:text-white duration-150" 
            to={url}>
                {name}
            </Link>
        </>
    )
}