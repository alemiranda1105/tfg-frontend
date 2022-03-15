import { useState } from "react";
import { EmailRegex } from "../../helpers/EmailRegex";
import { validateText } from "../../helpers/FormValidationHelper";
import { CustomInput } from "../custom_components/CustomInput";
import { ErrorValidationText } from "../custom_components/ErrorValidationText";

interface ContactFormData {
    reason: string,
    info: string,
    name: string,
    email: string
}

export const ContactFormComponent = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        reason: "",
        info: "",
        name: "",
        email: ""
    });

    const [validationError, setValidationError] = useState<ContactFormData>({
        reason: "",
        info: "",
        name: "",
        email: ""
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        
        // Validation
        var validation: string = "";
        if(name === "reason") {
            validation = validateText(value, 25, 3);
        } else if(name === "info") {
            validation = validateText(value, 1000, 5);
        } else if(name === "name") {
            validation = validateText(value, 30, 3);
        } else if(name === "email") {
            validation = validateText(value, undefined, undefined, EmailRegex);
        }

        setValidationError(prevState => ({
            ...prevState,
            [name]: validation
        }));

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }


    return (
        <form className="flex flex-col items-center w-3/4 bg-white rounded m-2" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center w-full m-3"> 
                <label htmlFor="reason">Motivo de la consulta</label>
                <CustomInput type={"text"} name={"reason"} placeholder={"Motivo"} handleChange={handleChange} required={true} />
                { validationError.reason && <ErrorValidationText error={validationError.reason} /> }
            </div>
            <div className="flex flex-col items-center w-full m-3"> 
                <label htmlFor="info">Información:</label>
                <textarea
                className="border rounded-md w-full md:w-1/3 py-1 px-2 max-w-xs focus:border-blue-500 outline-none ease-in-out duration-300"
                name="info" id="info" cols={50} rows={10} placeholder="Información" required
                onChange={handleChange}
                >
                </textarea>
                { validationError.info && <ErrorValidationText error={validationError.info} /> }
            </div>
            <div className="flex flex-col items-center w-full m-3"> 
                <h4 className="text-2xl font-extrabold text-blue-700">Tus datos</h4>
                <label htmlFor="name">Nombre:</label>
                <CustomInput type={"text"} name={"name"} placeholder={"Nombre"} handleChange={handleChange} required={true} />
                { validationError.name && <ErrorValidationText error={validationError.name} /> }
                <label htmlFor="email">Correo electrónico:</label>
                <CustomInput type={"email"} name={"email"} placeholder={"Correo electrónico"} handleChange={handleChange} required={true} />
                { validationError.email && <ErrorValidationText error={validationError.email} /> }
            </div>
        </form>
    )
}