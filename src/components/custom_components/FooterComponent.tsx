import { Link } from 'react-router-dom';
import logo from '../../res/logo-ulpgc.png';

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
        <footer className="flex justify-evenly justify-items-center items-center p-2.5 bg-white rounded-t mt-4">
            <a href="https://www.ulpgc.es" className='hover:scale-90 hover:shadow-inner active:scale-75 rounded-xl ease-out duration-150'>
                <img src={logo} alt="Logo Universidad de Las Palmas de Gran Canaria" className='h-full object-cover w-24'/>
            </a>
            <div className="flex flex-col justify-center justify-items-center text-center text-sm font-light">
                <>
                    { 
                        links.map(link => 
                            <Link to={link.url}
                            className="p-1 hover:text-blue-500 duration-300 ease-in-out">
                                {link.name}
                            </Link>
                        )
                    }
                </>
            </div>
        </footer>
    );
}