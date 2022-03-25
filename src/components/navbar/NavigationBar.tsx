import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { AuthContext } from "../../auth/AuthContextProvider";
import { userIsAuth } from "../../helpers/UserAuthHelper";
import { NavigationBarButton } from "./NavigationBarButton";
import { ProfileBarButton } from "./ProfileBarButton";
import { SmallNavBar } from "./SmallNavBar";

export interface LinkDict {
    name: string,
    url: string,
    actual: boolean
}

export const NavigationBar = () => {
    const location = useLocation();

    const {user_id, username, token} = useContext(AuthContext);
    const [profileLink, setProfileLink] = useState<LinkDict>();

    const [generalLinks, setGeneralLinks] = useState<LinkDict[]>();
    const [userLinks, setUserLinks] = useState<LinkDict[]>(); 

    useEffect(() => {
        setGeneralLinks([
            {name: "IDSEM", url: "/", actual: (location.pathname === "/")},
            {name: "Dataset", url: "/download_dataset", actual: (location.pathname === "/download_dataset")},
            {name: "Resultados", url: "/results", actual: (location.pathname === "/results")},
            {name: "FAQ", url: "/faq", actual: (location.pathname === "/faq")},
            {name: "Contacto", url: "/contact", actual: (location.pathname === "/contact")},
        ]);
        if(userIsAuth(user_id, token)) {
            setProfileLink({name: username, url: "/profile", actual: (location.pathname === "/profile")});
            setUserLinks([
                {name: "Mis métodos", url: "/my_methods", actual: (location.pathname === "/my_methods")}
            ]);

        } else {
            setProfileLink(undefined);
            setUserLinks([
                {name: "Login", url: "/login", actual: (location.pathname === "/login")},
                {name: "Registro", url: "/signup", actual: (location.pathname === "/signup")}
            ]);
        }        
    },[user_id, token, username, location])

    return (
        <>
            <div className="mb-2">
                {generalLinks && 
                    <>
                        <SmallNavBar links={generalLinks} profileLink={profileLink}/>
                        <header className="h-fit w-full bg-blue-500 text-white hidden md:flex">
                            <div className="w-full flex flex-row flex-wrap justify-between items-center content-center">
                                <div className="flex">
                                    { generalLinks.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()} actual={link.actual}/>) }
                                </div>
                                <div className="flex">
                                    {
                                        userIsAuth(user_id, token) && profileLink && userLinks &&
                                        <>
                                            { userLinks.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()} actual={link.actual}/>) }
                                            <ProfileBarButton name={profileLink.name} url={profileLink.url} key={v4()} actual={profileLink.actual}/>
                                        </>
                                    }
                                </div>
                            </div>
                        </header>
                    </>
                }
        </div>
        </>
    )
}