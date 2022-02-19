import { useState } from "react";

export const LoginFormComponent = () => {
    const [loginEmail, setLoginEmail] = useState(false);
    const handleCheckbox = () => setLoginEmail(!loginEmail);

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md drop-shadow bg-white">
            <form className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center w-full m-3">
                {!loginEmail &&
                <>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input type="text" id="username" placeholder="Nombre de usuario" 
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                        />
                </>
                }
                {loginEmail &&
                <>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" placeholder="Email" 
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                    />
                </>
                }
                </div>
                <div className="flex flex-row items-center align-between m-3 -mt-2">
                    <input onClick={handleCheckbox} checked={loginEmail} type="checkbox" className="mx-3"/>
                    <label htmlFor="checkbox" className="font-bold">Usar email</label>
                </div>
                <div className="flex flex-col items-center w-full m-3">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" placeholder="Contraseña" 
                        className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
                    />
                </div>

            </form>
            
        </div>
    )
}