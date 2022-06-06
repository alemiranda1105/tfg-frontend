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
    actual: boolean,
    customStyle?: string
}

export const NavigationBar = () => {
    const location = useLocation();

    const {user_id, username, token, role} = useContext(AuthContext);
    const [profileLink, setProfileLink] = useState<LinkDict>();

    const [generalLinks, setGeneralLinks] = useState<LinkDict[]>();
    const [userLinks, setUserLinks] = useState<LinkDict[]>(); 

    useEffect(() => {
        let links = [
            {name: "IDSEM", url: "/", actual: (location.pathname === "/")},
            {name: "Dataset", url: "/download_dataset", actual: (location.pathname === "/download_dataset")},
            {name: "Results", url: "/results", actual: (location.pathname === "/results")},
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
                {name: "Upload method", url: "/upload_method", actual: (location.pathname === "/upload_method")},
                {name: "My methods", url: "/my_methods", actual: (location.pathname === "/my_methods")},
                {name: username, url: "/profile", actual: (location.pathname === "/profile")}
            ]);

        } else {
            setProfileLink(undefined);
            setUserLinks([                      
                {name: "Upload method", url: "/upload_method", actual: (location.pathname === "/upload_method")},
                {name: "Login", url: "/login", actual: (location.pathname === "/login"), customStyle: "font-bold p-2.5 mx-3 my-1 text-black bg-blue-200 shadow rounded hover:rounded-none hover:shadow-inner hover:bg-white duration-150"},
                {name: "Sign up", url: "/signup", actual: (location.pathname === "/signup"), customStyle: "font-bold p-2.5 mx-3 my-1 text-black border border-blue-200 shadow rounded hover:rounded-none hover:shadow-inner hover:bg-white duration-150"}
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
                        <header className="bg-slate-100 h-fit w-full justify-center border-b-2 shadow hidden 3xl:flex">
                            <div className="w-3/4 flex flex-row flex-wrap justify-between items-center content-center">
                                <div className="flex">
                                    { generalLinks.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()} actual={link.actual}/>) }
                                </div>
                                <div className="flex">
                                    { 
                                        userLinks &&
                                        userLinks.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()} actual={link.actual} customStyle={link.customStyle}/>)
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