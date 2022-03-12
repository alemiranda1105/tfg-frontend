import { useState } from "react";
import { DownloadButton } from "./DownloadButton";


export function DownloadResultsComponent() {
    const [showOptions, setShowOptions] = useState(false);

    return(
        <div className="flex flex-col m-3">
            <button
            onClick={() => setShowOptions(!showOptions)}
            className="px-3 py-2 mb-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-400 hover:scale-105 transition duration-100 ease-in-out"
            >
                Descargar resultados
            </button>
            {
                showOptions &&
                <div className="border rounded-md p-2 bg-white">
                    <DownloadButton text={"Descargar JSON"} url={"methods/download_json"} fileType={"application/json"} />
                    <DownloadButton text={"Descargar CSV"} url={"methods/download_csv"} fileType={"text/csv"} />
                    <DownloadButton text={"Descargar XLSX"} url={"methods/download_xls"} fileType={"application/vnd.ms-excel"} />
                </div>
            }
        </div>
    )
}