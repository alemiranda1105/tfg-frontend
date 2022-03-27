import { useNavigate } from "react-router-dom";


interface DownloadButtonProps {
    text: string,
    url: string,
    fileType: string
}

export const DownloadButton = ({text, url, fileType}: DownloadButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/downloading', { 
            state: {
                url: `${url}`,
                fileType: `${fileType}`
            }
        });
    }
    return (
        <button
        onClick={() => handleClick()}
        className="px-3 py-2 mb-2 bg-blue-500 rounded-lg hover:scale-110 hover:rounded-none transition duration-300 ease-in"
        >
            <h6 className="font-bold text-2xl text-white">
                {text}
            </h6>
        </button>
    )
}