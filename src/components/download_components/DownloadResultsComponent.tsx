import { useState } from "react"
import { useNavigate } from "react-router-dom";


export function DownloadResultsComponent() {
    const navigate = useNavigate();

    const [showOptions, setShowOptions] = useState(false);

    const handleClick = (url: string, fileType: string) => {
        navigate('/downloading', { 
            state: {
                url: `${url}`,
                fileType: `${fileType}`
            }
        });
    }

    return(
        <div className="flex flex-col m-3">
            <button
            onClick={() => setShowOptions(!showOptions)}
            className="px-3 py-2 mb-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none"
            >
                Descargar resultados
            </button>
            {
                showOptions &&
                <div className="shadow-md rounded-md m-2 p-2">
                    <button
                    onClick={() => handleClick('methods/download_json', 'application/json')}
                    className="px-3 py-2 mb-2"
                    >
                        <h6 className="font-bold text-blue-700 underline underline-offset-2 hover:underline-offset-0 hover:text-orange-300">
                            Descargar JSON
                        </h6>
                    </button>
                    <button
                    onClick={() => handleClick('methods/download_csv', 'text/csv')}
                    className="px-3 py-2 mb-2"
                    >
                        <h6 className="font-bold text-blue-700 underline underline-offset-2 hover:underline-offset-0 hover:text-orange-300">
                            Descargar CSV
                        </h6>
                    </button>
                    <button
                    onClick={() => handleClick('methods/download_xls', 'application/vnd.ms-excel')}
                    className="px-3 py-2 mb-2"
                    >
                        <h6 className="font-bold text-blue-700 underline underline-offset-2 hover:underline-offset-0 hover:text-orange-300">
                            Descargar XLSX
                        </h6>
                    </button>
                </div>
            }
        </div>
    )
}