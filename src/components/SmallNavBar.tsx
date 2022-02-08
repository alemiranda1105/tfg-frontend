import { useState } from "react";
import { NavigationMenu, NavigationMenuProps } from "./NavigationMenu";
import { ReactComponent as MenuIcon } from "../res/menu.svg";
import { ReactComponent as CloseIcon } from "../res/CloseIcon.svg";

export const SmallNavBar = ({links}: NavigationMenuProps) => {
    const [menu, setMenu] = useState(false);
    function displayMenu() {
        setMenu(!menu);
    }

    return (
        <header className="fixed top-0 p-1 md:hidden w-full bg-blue-300/90 flex flex-col rounded-b-md shadow-md">
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
        </header>
    );
}