import { DownloadResultsComponent } from "../components/download_components/DownloadResultsComponent"
import { MethodsTableComponent } from "../components/table_components/MethodsTableComponent"

export const ResultsPage = () => {
    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-blue-700">Resultados y ranking</h1>
            <h3 className="text-xl font-light">Aquí podrá visualizar todos los resultados de los métodos subidos por los usuarios</h3>
            <h4 className="text-lg font-light m-2">Al pulsar en el nombre de la columna podrá ordenar los datos</h4>
            <DownloadResultsComponent />
            <div className="inline-block overflow-y-auto w-[80%] rounded-md bg-white">
                <MethodsTableComponent />
            </div>
        </div>
    )
}