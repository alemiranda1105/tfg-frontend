import { useDownload } from "../hooks/useDownload";

export interface DownloadComponentProps {
    url: string,
    fileType: string
}

export const DownloadComponent = ({url , fileType}: DownloadComponentProps) => {
    const { file, fileName, downloading, error } = useDownload(url, fileType);

    function retryDownload() {
        window.location.reload();
    }
    
    return (
        <div className="flex flex-col justify-center items-center p-3 rounded-md shadow">
            {downloading &&
                <h1 className="text-2xl font-extrabold m-5 animate-pulse">Su archivo se está descargando</h1>
            }
            {file &&
                <div className="flex flex-col justify-center items-center p-3">
                    <h1 className="text-2xl font-extrabold m-5">La descarga se ha completado</h1>
                    <h3 className="text-lg font-light m-2">Si el archivo no se ha descargado, pulse el siguiente botón</h3>
                    <a className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none"
                    href={file} 
                    download={fileName}>
                        Descargar
                    </a>
                </div>
            }
            {error && 
                <div className="flex flex-col justify-center items-center p-3">
                    <h3 className="text-lg font-light m-2">{error}</h3>
                    <button 
                    className="px-3 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-300 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none"
                    onClick={retryDownload}>
                        Reintentar
                    </button>
                </div>
            }
        </div>
    );
}