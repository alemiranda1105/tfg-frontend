import { DownloadResultsComponent } from "../components/download_components/DownloadResultsComponent"
import { MethodsTableComponent } from "../components/table_components/MethodsTableComponent"

export const ResultsPage = () => {
    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-blue-700">Ranking</h1>
            <h3 className="text-xl font-light">In this pages, you can visualize the public ranking</h3>
            <h4 className="text-lg font-light m-2">By clicking in each column title, the results will be sorted by the category pressed</h4>
            <DownloadResultsComponent />
            <div className="inline-block overflow-y-auto w-[80%] rounded-md bg-white">
                <MethodsTableComponent />
            </div>
        </div>
    )
}