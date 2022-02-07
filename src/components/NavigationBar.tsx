import { useState } from "react";
import { v4 } from "uuid";
import { NavigationBarButton } from "./NavigationBarButton";
import { NavigationMenu } from "./NavigationMenu";
import { ReactComponent as MenuIcon } from "../res/menu.svg";
import { ReactComponent as CloseIcon } from "../res/CloseIcon.svg";

export interface LinkDict {
    name: string,
    url: string
}

export const NavigationBar = () => {
    const [menu, setMenu] = useState(false);
    const links: LinkDict[] = [
        {name: "Inicio", url: "/"},
        {name: "Resultados", url: "/results"},
    ];

    function displayMenu() {
        setMenu(!menu);
    }

    return (
        <>
        <div className="sticky top-0 md:hidden w-full bg-blue-300/90 flex flex-col">
            <button onClick={displayMenu}>
                {!menu && 
                    <div className="w-10 text-blue-500">
                        <MenuIcon />
                    </div>
                }
                {menu && 
                    <div className="w-10 text-orange-500 ">
                        <CloseIcon />
                    </div>
                }
            </button>
            {
                menu &&
                <NavigationMenu links={links} />
            }
        </div>

        <div className="h-fit bg-blue-100 hidden md:flex">
            { links.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()}/>) }
        </div>
        
        </>
    )
}