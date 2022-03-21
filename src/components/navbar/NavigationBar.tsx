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
    const [links, setLinks] = useState<LinkDict[]>();
    const [profileLink, setProfileLink] = useState<LinkDict>();

    useEffect(() => {
        if(userIsAuth(user_id, token)) {
            setLinks([
                {name: "IDSEM", url: "/", actual: (location.pathname === "/")},
                {name: "Dataset", url: "/download_dataset", actual: (location.pathname === "/download_dataset")},
                {name: "Resultados", url: "/results", actual: (location.pathname === "/results")},
                {name: "FAQ", url: "/faq", actual: (location.pathname === "/faq")},
                {name: "Contacto", url: "/contact", actual: (location.pathname === "/contact")},
                {name: "Mis métodos", url: "/my_methods", actual: (location.pathname === "/my_methods")},
                {name: "Subir método", url: "/upload_method", actual: (location.pathname === "/upload_method")}
            ]);
            setProfileLink({name: username, url: "/profile", actual: (location.pathname === "/profile")})
        } else {
            setLinks([
                {name: "IDSEM", url: "/", actual: (location.pathname === "/")},
                {name: "Dataset", url: "/download_dataset", actual: (location.pathname === "/download_dataset")},
                {name: "Resultados", url: "/results", actual: (location.pathname === "/results")},
                {name: "FAQ", url: "/faq", actual: (location.pathname === "/faq")},
                {name: "Contacto", url: "/contact", actual: (location.pathname === "/contact")},
                {name: "Login", url: "/login", actual: (location.pathname === "/login")},
                {name: "Registro", url: "/signup", actual: (location.pathname === "/signup")}
            ]);
            setProfileLink(undefined);
        }        
    },[user_id, token, username, location])

    return (
        <>
            <div className="mb-2">
                {links && 
                    <>
                        <SmallNavBar links={links} profileLink={profileLink}/>
                        <header className="h-fit w-full bg-blue-500 text-white hidden md:flex md:items-center md:justify-center">
                            <div className="flex flex-row">
                                { links.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()} actual={link.actual}/>) }
                                <div className="flex">
                                    {
                                        userIsAuth(user_id, token) && profileLink &&
                                        <ProfileBarButton name={profileLink.name} url={profileLink.url} key={v4()} actual={profileLink.actual}/>
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