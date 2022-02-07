import { v4 } from "uuid"
import { LinkDict } from "./NavigationBar"
import { NavigationMenuButton } from "./NavigationMenuButton"

export interface NavigationMenuProps {
    links: LinkDict[]
}

export const NavigationMenu = ({links}: NavigationMenuProps) => {
    return(
        <div className="flex flex-col w-full drop-shadow-md">
            { links.map(link => <NavigationMenuButton name={link.name} url={link.url} key={v4()}/>) }
        </div>
    )
}