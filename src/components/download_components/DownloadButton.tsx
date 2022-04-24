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
        className="px-3 py-2 mb-2 border bg-blue-300 text-white rounded-lg hover:scale-x-110 hover:rounded-none transition duration-300 ease-linear"
        >
            <h6 className="font-bold text-2xl">
                {text}
            </h6>
        </button>
    )
}