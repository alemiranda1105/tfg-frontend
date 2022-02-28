import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DownloadComponent, DownloadComponentProps } from "../components/download_components/DownloadComponent";



export const DownloadingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [download, setDownload] = useState("");
    const [type, setFileType] = useState("");

    useEffect(() => {
        if(location.state === null) {
            navigate('/');
        } else {
            const { url, fileType } = location.state as DownloadComponentProps;
            setDownload(url);
            setFileType(fileType);
        }
        
    }, [location.state, navigate]);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <DownloadComponent url={download} fileType={type} />
            <Link to='/' className="m-5 p-2 rounded-md bg-slate-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">Volver al inicio</Link>
        </div>
    )
}