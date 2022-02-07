import logo from '../res/logo-ulpgc.png';

export const FooterComponent = () => {
    return (
        <footer className="flex justify-center justify-items-center items-center">
            <a href="https://www.ulpgc.es" className='hover:scale-90 hover:shadow-inner active:scale-75 rounded-xl ease-out duration-150'>
                <img src={logo} alt="Logo Universidad de Las Palmas de Gran Canaria" className='h-full object-cover w-24'/>
            </a>
            <div className="flex flex-col justify-center justify-items-center text-center">
                <p className='text-slate-500'>Página desarollada por Alejandro Miranda López</p>
            </div>
        </footer>
    );
}