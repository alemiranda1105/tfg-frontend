import { useContext } from "react"
import { v4 } from "uuid"
import { AuthContext } from "../../auth/AuthContextProvider"
import { userIsAuth } from "../../helpers/UserAuthHelper"
import { CloseSessionComponent } from "../auth_components/CloseSessionComponent"
import { LinkDict } from "./NavigationBar"
import { NavigationMenuButton } from "./NavigationMenuButton"

export interface NavigationMenuProps {
    links: LinkDict[]
}

export const NavigationMenu = ({links}: NavigationMenuProps) => {
    const {user_id, token} = useContext(AuthContext);
    
    return(
        <div className="flex flex-col w-full">
            { links.map(link => <NavigationMenuButton name={link.name} url={link.url} key={v4()} actual={link.actual}/>) }
            {
                userIsAuth(user_id, token) &&
                <CloseSessionComponent />
            }
        </div>
    )
}