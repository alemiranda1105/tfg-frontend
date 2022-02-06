import { MethodsTableComponent } from "../components/MethodsTableComponent"

export const ResultsPage = () => {
    return (
        <div className="h-screen flex flex-col items-center">
            <div className="flex flex-col items-center w-[80%] m-8 p-4 rounded-md drop-shadow bg-white">
                <h1 className="text-4xl font-extrabold">Resultados y ranking</h1>
                <h3 className="text-xl font-light">Aquí podrá visualizar todos los resultados de los métodos subidos por los usuarios</h3>
            </div>
            <MethodsTableComponent />
        </div>
    )
}