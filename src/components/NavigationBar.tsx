import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { AuthContext } from "../auth/AuthContextProvider";
import { userIsAuth } from "../helpers/UserAuthHelper";
import { NavigationBarButton } from "./NavigationBarButton";
import { SmallNavBar } from "./SmallNavBar";

export interface LinkDict {
    name: string,
    url: string
}

export const NavigationBar = () => {
    const {user_id, token} = useContext(AuthContext);
    const [links, setLinks] = useState<LinkDict[]>();

    useEffect(() => {
        if(userIsAuth(user_id, token)) {
            setLinks([
                {name: "Inicio", url: "/"},
                {name: "Resultados", url: "/results"},
                {name: "Cerrar sesión", url: "/"}
            ]);
        } else {
            setLinks([
                {name: "Inicio", url: "/"},
                {name: "Resultados", url: "/results"},
                {name: "Registro", url: "/signup"}
            ]);
        }        
    },[user_id, token])

    return (
        <>
        {links &&
            <div className="mb-8">
                <SmallNavBar links={links} />
                <header className="h-fit w-full fixed top-0 bg-blue-300/90 hidden md:flex">
                    { links.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()}/>) }
                </header>
            </div>
        }
        </>
    )
}