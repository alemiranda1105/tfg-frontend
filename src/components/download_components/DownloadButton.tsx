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
        className="px-3 py-2 mb-2"
        >
            <h6 className="font-bold text-blue-700 underline underline-offset-2 hover:underline-offset-0 hover:text-blue-400">
                {text}
            </h6>
        </button>
    )
}