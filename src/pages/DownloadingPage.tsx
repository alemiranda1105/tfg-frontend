import { Link } from "react-router-dom";
import { DownloadComponent } from "../components/DownloadComponent";


export const DownloadingPage = () => {

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <DownloadComponent url="" />
            <Link to='/' className="m-5 p-2 rounded-md bg-slate-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">Volver al inicio</Link>
        </div>
    )
}