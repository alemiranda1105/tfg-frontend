import { useFetch } from "../hooks/useFetch";

interface ExternalUser {
    id: string
    username: string
}

export function AuthorDataComponent(id: {id: string}) {
    const { data, error } = useFetch<ExternalUser>(`users/${id.id}`);

    return(
        <>
        <div className="flex flex-col items-center m-2 w-full">
            <h3 className="text-xl font-bold">Autor</h3>
            { error &&
                <h4 className="text-sm">Ha ocurrido un error: {error}</h4>
            }
            { data &&
                <h4 className="text-lg">{data.username}</h4>
            }
        </div>

        </>
    )
}