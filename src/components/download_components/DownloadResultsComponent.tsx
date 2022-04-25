import { useState } from "react";
import { DownloadButton } from "./DownloadButton";


export function DownloadResultsComponent() {
    const [showOptions, setShowOptions] = useState(false);

    return(
        <div className="flex flex-col m-3">
            <button
            onClick={() => setShowOptions(!showOptions)}
            className="px-3 py-2 mb-2 bg-slate-200 rounded-md text-black font-bold hover:shadow transition-all duration-300"
            >
                Download results
            </button>
            {
                showOptions &&
                <div className="border rounded-md p-2 bg-white">
                    <DownloadButton text={"Download JSON"} url={"methods/download_json"} fileType={"application/json"} />
                    <DownloadButton text={"Download CSV"} url={"methods/download_csv"} fileType={"text/csv"} />
                    <DownloadButton text={"Download XLSX"} url={"methods/download_xls"} fileType={"application/vnd.ms-excel"} />
                </div>
            }
        </div>
    )
}