import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import logo from '../../res/logo-ctim.png';

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
        <footer className="flex justify-evenly items-center p-2.5 bg-white rounded-t mt-4">
            <div className='flex flex-col items-center'>
                <a href="https://ctim.ulpgc.es/site/index.php?option=com_jresearch&view=team&id=3&task=show&Itemid=343&lang=es" className='hover:scale-90 hover:shadow-inner active:scale-75 rounded-xl ease-out duration-150'>
                    <img src={logo} alt="Logo CTIM" className='h-full object-cover w-24 m-1'/>
                </a>
                <p className='font-light text-xs'>
                    Copyright &copy; 2022 Análisis de Imágenes e Ingeniería del software (AIIS)
                </p>
            </div>
            <div className="flex flex-col justify-center justify-items-center text-center text-sm font-light">
                <>
                    { 
                        links.map(link => 
                            <Link to={link.url}
                            key={v4()}
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