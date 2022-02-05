import { Link } from "react-router-dom";


export const DownloadingPage = () => {
    function retryDownload() {
        console.log('reintentar');
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center p-3 rounded-md shadow">
                <h1 className="text-2xl font-extrabold m-5 animate-pulse">Su archivo se está descargando</h1>
                <h3 className="text-lg font-light m-2">En caso de que la descarga falle pulse el botón de reintentar</h3>
                <button 
                className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none"
                onClick={retryDownload}>
                    Reintentar
                </button>
            </div>
            <Link to='/' className="m-5 p-2 rounded-md bg-slate-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">Volver al inicio</Link>
        </div>
    )
}