
export const RegistrationFormComponent = () => {
    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            <form className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center w-full m-3">
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input type="text" name="username" id="username" placeholder="Nombre de usuario"
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs"
                    />
                </div>
                <div className="flex flex-col items-center w-full m-3">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" name="email" id="email" placeholder="Email"
                    className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs"
                    />
                </div>
                <div className="flex flex-col items-center w-full m-3">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" name="password" id="password" placeholder="Contraseña"
                    className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs"
                    />
                </div>
                <div>
                    <button type="submit" className="px-3 py-2 mt-5 rounded-md bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">
                        <h4 className="text-white font-bold">Registro</h4>
                    </button>
                </div>
            </form>
        </div>
    )
}