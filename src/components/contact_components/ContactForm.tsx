import { CustomInput } from "../custom_components/CustomInput";


export const ContactForm = () => {
    return (
        <form className="flex flex-col items-center w-3/4 bg-white rounded m-2">
            <div className="flex flex-col items-center w-full m-3"> 
                <label htmlFor="reason">Motivo de la consulta</label>
                <CustomInput type={"text"} name={"reason"} placeholder={"Motivo"} handleChange={() => {}} required={true} value={""} />
            </div>
            <div className="flex flex-col items-center w-full m-3"> 
                <label htmlFor="info">Información:</label>
                <textarea
                className="border rounded-md w-full md:w-1/3 py-1 px-2 max-w-xs focus:border-blue-500 outline-none ease-in-out duration-300"
                name="info" id="info" cols={50} rows={10} placeholder="Información" required>
                </textarea>
            </div>
            <div className="flex flex-col items-center w-full m-3"> 
                <h4 className="text-2xl font-extrabold text-blue-700">Tus datos</h4>
                <label htmlFor="name">Nombre:</label>
                <CustomInput type={"text"} name={"nombre"} placeholder={"Nombre"} handleChange={() => {}} required={true} value={""} />
                <label htmlFor="email">Correo electrónico:</label>
                <CustomInput type={"email"} name={"email"} placeholder={"Correo electrónico"} handleChange={() => {}} required={true} value={""} />
            </div>
        </form>
    )
}