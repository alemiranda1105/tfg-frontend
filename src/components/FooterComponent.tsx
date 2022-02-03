import logo from '../res/logo-ulpgc.png';

export const FooterComponent = () => {
    return (
        <footer className="flex justify-center justify-items-center">
            <img src={logo} alt="Logo Universidad de Las Palmas de Gran Canaria" className='h-48 object-cover md:h-full w-48'/>
            <div className="flex flex-col justify-center justify-items-center text-center">
                <p>Página desarollada por Alejandro Miranda López</p>
                <p><a href="mailto:alejandro.miranda103@alu.ulpgc.es">Contacto</a></p>
            </div>
        </footer>
    );
}