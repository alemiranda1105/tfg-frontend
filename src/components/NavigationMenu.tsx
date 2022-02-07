import { v4 } from "uuid"
import { LinkDict } from "./NavigationBar"
import { NavigationBarButton } from "./NavigationBarButton"

interface NavigationMenuProps {
    links: LinkDict[]
}

export const NavigationMenu = ({links}: NavigationMenuProps) => {
    return(
        <div className="flex flex-col w-full">
            { links.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()}/>) }
        </div>
    )
}