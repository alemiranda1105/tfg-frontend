import { useNavigate } from 'react-router';
export const DownloadDatasetComponent = () => {
    const navigate = useNavigate();
    
    function downloadDataset() {
        navigate('/downloading', { 
            state: {
                url: 'dataset',
                fileType: 'application/x-zip-compressed'
            }
        });
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