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
            <h6 className="font-bold hover:text-blue-500 underline underline-offset-2 hover:underline-offset-1 transition duration-300">
                {text}
            </h6>
        </button>
    )
}