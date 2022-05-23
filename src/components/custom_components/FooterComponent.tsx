import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import logo from '../../res/logo-ctim.png';
import logo_ulpgc from '../../res/logo-ulpgc.png';

export const FooterComponent = () => {
    const links = [
        {name: "IDSEM", url: "/"},
        {name: "Dataset", url: "/download_dataset"},
        {name: "Results", url: "/results"},
        {name: "Upload method", url: "/upload_method"},
        {name: "FAQ", url: "/faq"},
        {name: "Contact", url: "/contact"}
    ];

    return (
        <footer className="flex flex-col items-center bg-slate-100 rounded-t mt-4 w-full">
            <div className="flex justify-between items-center w-3/4">
                <div className='flex flex-col items-center'>
                    <div className="flex items-center justify-evenly w-full">
                        <a href="https://www.ulpgc.es/" className='hover:scale-90 hover:shadow-inner active:scale-75 rounded-xl ease-out duration-150'>
                            <img src={logo_ulpgc} alt="Logo CTIM" className='h-full object-cover w-[17rem] m-1'/>
                        </a>
                        <a href="https://ctim.ulpgc.es/" className='hover:scale-90 hover:shadow-inner active:scale-75 rounded-xl ease-out duration-150'>
                            <img src={logo} alt="Logo CTIM" className='h-full object-cover w-[15rem] m-1'/>
                        </a>
                    </div>
                </div>
                <div className="flex justify-center justify-items-center text-center text-sm font-light">
                    <div className="flex flex-col justify-center justify-items-center text-center text-sm font-light m-2">
                        <>
                            { 
                                links.slice(0, 3).map(link => 
                                    <Link to={link.url}
                                    key={v4()}
                                    className="p-1 hover:text-blue-500 duration-300 ease-in-out">
                                        {link.name}
                                    </Link>
                                )
                            }
                        </>
                    </div>
                    <div className="flex flex-col justify-center justify-items-center text-center text-sm font-light m-2">
                        <>
                            { 
                                links.slice(3, links.length).map(link => 
                                    <Link to={link.url}
                                    key={v4()}
                                    className="p-1 hover:text-blue-500 duration-300 ease-in-out">
                                        {link.name}
                                    </Link>
                                )
                            }
                        </>
                    </div>
                </div>
            </div>
            <p className='font-light text-xs'>
                Copyright &copy; 2022 University of Las Palmas de Gran Canaria
            </p>
        </footer>
    );
}