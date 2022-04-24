import { DownloadResultsComponent } from "../components/download_components/DownloadResultsComponent"
import { MethodsTableComponent } from "../components/table_components/MethodsTableComponent"

export const ResultsPage = () => {
    return (
        <div className="h-screen flex flex-col content-center items-center">
            <h1 className="section-title">Ranking</h1>
            <h3 className="text-xl font-light m-2">In this pages, you can visualize the public ranking</h3>
            <h4 className="text-lg font-light m-2">By clicking in each column title, the results will be sorted by the category pressed</h4>
            <DownloadResultsComponent />
            <div className="inline-block overflow-y-auto w-[80%] border shadow bg-white">
                <MethodsTableComponent />
            </div>
        </div>
    )
}