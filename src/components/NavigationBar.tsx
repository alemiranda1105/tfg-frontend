import { v4 } from "uuid";
import { NavigationBarButton } from "./NavigationBarButton";
import { SmallNavBar } from "./SmallNavBar";

export interface LinkDict {
    name: string,
    url: string
}

export const NavigationBar = () => {
    const links: LinkDict[] = [
        {name: "Inicio", url: "/"},
        {name: "Resultados", url: "/results"},
    ];

    return (
        <>
        <SmallNavBar links={links} />

        <header className="h-fit sticky top-0 bg-blue-300/90 hidden md:flex">
            { links.map(link => <NavigationBarButton name={link.name} url={link.url} key={v4()}/>) }
        </header>
        </>
    )
}