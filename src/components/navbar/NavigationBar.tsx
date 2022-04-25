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

    const {user_id, username, token, role} = useContext(AuthContext);
    const [profileLink, setProfileLink] = useState<LinkDict>();

    const [generalLinks, setGeneralLinks] = useState<LinkDict[]>();
    const [userLinks, setUserLinks] = useState<LinkDict[]>(); 

    useEffect(() => {
        var links = [
            {name: "IDSEM", url: "/", actual: (location.pathname === "/")},
            {name: "Dataset", url: "/download_dataset", actual: (location.pathname === "/download_dataset")},
            {name: "Results", url: "/results", actual: (location.pathname === "/results")},
            {name: "Upload method", url: "/upload_method", actual: (location.pathname === "/upload_method")},
            {name: "FAQ", url: "/faq", actual: (location.pathname === "/faq")},
            {name: "Contact", url: "/contact", actual: (location.pathname === "/contact")},
        ];
        if(userIsAuth(user_id, token)) {
            if(role === "admin") {
                links.push(
                    {name: "Add content", url: "/add_content", actual:(location.pathname === "/add_content")}
                );
            }
            setProfileLink({name: username, url: "/profile", actual: (location.pathname === "/profile")});
            setUserLinks([
                {name: "My methods", url: "/my_methods", actual: (location.pathname === "/my_methods")},
                {name: username, url: "/profile", actual: (location.pathname === "/profile")}
            ]);

        } else {
            setProfileLink(undefined);
            setUserLinks([
                {name: "Login", url: "/login", actual: (location.pathname === "/login")},
                {name: "Sign up", url: "/signup", actual: (location.pathname === "/signup")}
            ]);
        }
        setGeneralLinks(links);     
    },[user_id, token, username, location, role])

    return (
        <>
            <div className="mb-2">
                {generalLinks &&
                    <>
                        <SmallNavBar links={generalLinks} profileLink={profileLink} userLinks={userLinks}/>
                        <header className="bg-slate-300 h-fit w-full border-b-2 shadow hidden md:flex">
                            <div className="w-full flex flex-row flex-wrap justify-between items-center content-center">
                                <div className="flex">
                                    { generalLinks.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()} actual={link.actual}/>) }
                                </div>
                                <div className="flex">
                                    { 
                                        userLinks &&
                                        userLinks.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()} actual={link.actual}/>)
                                    }
                                    {
                                        userIsAuth(user_id, token) &&
                                        <>
                                            <CloseSessionComponent />
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