import { NavigationBarButton } from "./NavigationBarButton";

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
        <div className="flex h-fit bg-blue-100">
            { links.map(link => <NavigationBarButton name={link.name} url={link.url} />) }
        </div>
    )
}