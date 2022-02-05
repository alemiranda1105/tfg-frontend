
export const DownloadDatasetComponent = () => {
    function downloadDataset() {
        console.log("Descargando");
    }

    return (
        <div>
            <button 
            className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none" 
            onClick={downloadDataset}>
                Descargar
            </button>
        </div>
    )
}