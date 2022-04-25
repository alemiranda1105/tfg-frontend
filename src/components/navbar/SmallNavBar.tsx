import { useEffect, useRef, useState } from "react";
import { NavigationMenu, NavigationMenuProps } from "./NavigationMenu";
import { ReactComponent as MenuIcon } from "../../res/menu.svg";
import { ReactComponent as CloseIcon } from "../../res/CloseIcon.svg";
import { useLocation } from "react-router-dom";

export const SmallNavBar = ({links, profileLink, userLinks}: NavigationMenuProps) => {
    const [menu, setMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [currentLocation, setCurrentLocation] = useState("");
    const location = useLocation();

    function displayMenu() {
        setMenu(!menu);
    }

    useEffect(() => {
        if(location.pathname !== currentLocation) {
            setMenu(false);
            setCurrentLocation(location.pathname);
        }
        const handleClickOutside = (event: Event) => {
            if(ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
                setMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [menu, location.pathname, currentLocation])

    return (
        <header className="bg-slate-300 p-1 md:hidden w-full border-b-2 text-black flex flex-col shadow-md">
            <button onClick={displayMenu}>
                <div className="w-10 text-black">
                    {!menu && <MenuIcon />}
                    {menu && <CloseIcon />}
                </div>
            </button>
            <div className="w-full text-center" ref={ref}>
            {
                menu &&
                <NavigationMenu links={links} profileLink={profileLink} userLinks={userLinks}/>
            }
            </div>
        </header>
    );
}