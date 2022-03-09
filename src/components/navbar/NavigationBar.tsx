import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { AuthContext } from "../../auth/AuthContextProvider";
import { userIsAuth } from "../../helpers/UserAuthHelper";
import { CloseSessionComponent } from "../auth_components/CloseSessionComponent";
import { NavigationBarButton } from "./NavigationBarButton";
import { SmallNavBar } from "./SmallNavBar";

export interface LinkDict {
    name: string,
    url: string
}

export const NavigationBar = () => {
    const {user_id, username, token} = useContext(AuthContext);
    const [links, setLinks] = useState<LinkDict[]>();

    useEffect(() => {
        if(userIsAuth(user_id, token)) {
            setLinks([
                {name: "Inicio", url: "/"},
                {name: "Resultados", url: "/results"},
                {name: "Mis métodos", url: "/my_methods"},
                {name: "Subir método", url: "upload_method"}
            ]);
        } else {
            setLinks([
                {name: "Inicio", url: "/"},
                {name: "Resultados", url: "/results"},
                {name: "Login", url: "/login"},
                {name: "Registro", url: "/signup"}
            ]);
        }        
    },[user_id, token, username])

    return (
        <>
            <div className="mb-8">
                {links && 
                    <>
                        <SmallNavBar links={links} />
                        <header className="h-fit w-full bg-blue-300/90 hidden md:flex md:justify-between">
                            <div className="flex flex-row">
                                { links.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()}/>) }

                                {
                                    userIsAuth(user_id, token) &&
                                    <CloseSessionComponent />
                                }
                            </div>
                            <div className="flex flex-row mr-10">
                                {
                                    userIsAuth(user_id, token) &&
                                    <NavigationBarButton name={username} url={'/profile'} />
                                }
                            </div>
                        </header>
                    </>
                }
        </div>
        </>
    )
}