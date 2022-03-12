import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { AuthContext } from "../../auth/AuthContextProvider";
import { userIsAuth } from "../../helpers/UserAuthHelper";
import { CloseSessionComponent } from "../auth_components/CloseSessionComponent";
import { NavigationBarButton } from "./NavigationBarButton";
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
                {name: "Inicio", url: "/", actual: (location.pathname === "/")},
                {name: "Resultados", url: "/results", actual: (location.pathname === "/results")},
                {name: "Mis métodos", url: "/my_methods", actual: (location.pathname === "/my_methods")},
                {name: "Subir método", url: "/upload_method", actual: (location.pathname === "/upload_method")}
            ]);
            setProfileLink({name: username, url: "/profile", actual: (location.pathname === "/profile")})
        } else {
            setLinks([
                {name: "Inicio", url: "/", actual: (location.pathname === "/")},
                {name: "Resultados", url: "/results", actual: (location.pathname === "/results")},
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
                        <header className="h-fit w-full bg-blue-500 text-white hidden md:flex md:justify-between">
                            <div className="flex flex-row">
                                { links.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()} actual={link.actual}/>) }

                                {
                                    userIsAuth(user_id, token) &&
                                    <CloseSessionComponent />
                                }
                            </div>
                            <div className="flex flex-row mr-10">
                                {
                                    userIsAuth(user_id, token) && profileLink &&
                                    <NavigationBarButton name={profileLink.name} url={profileLink.url} key={v4()} actual={profileLink.actual}/>
                                }
                            </div>
                        </header>
                    </>
                }
        </div>
        </>
    )
}