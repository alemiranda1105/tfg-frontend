import { useState } from "react";
import { EmailRegex } from "../../helpers/EmailRegex";
import { validateText } from "../../helpers/FormValidationHelper";
import { CustomInput } from "../custom_components/CustomInput";
import { ErrorValidationText } from "../custom_components/ErrorValidationText";
import { SubmitButton } from "../custom_components/SubmitButton";

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

    const [submitError, setSubmitError] = useState("");

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
        var validation = true;
        Object.entries(validationError).forEach(entry => {
            const [, value] = entry;
            if(value !== "") validation = false;
        });
        if(validation) {
            const emailURL = `mailto:alejandro.miranda103@alu.ulpgc.es?subject=${formData.reason}&body=${formData.info}&cc=${formData.email}`;
            window.open(emailURL, '_blank', 'rel=noreferrer')?.focus();
        } else {
            setSubmitError("Compruebe todos los campos");
        }
    }


    return (
        <form className="flex flex-col items-center w-3/4 bg-white rounded m-2" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center w-full m-3"> 
                <label htmlFor="reason">Reason</label>
                <CustomInput type={"text"} name={"reason"} placeholder={"Reason"} handleChange={handleChange} required={true} />
                { validationError.reason && <ErrorValidationText error={validationError.reason} /> }
            </div>
            <div className="flex flex-col items-center w-full m-3"> 
                <label htmlFor="info">Information</label>
                <textarea
                className="border rounded-md w-full md:w-1/3 py-1 px-2 max-w-xs focus:border-blue-500 outline-none ease-in-out duration-300"
                name="info" id="info" cols={50} rows={10} placeholder="Information" required
                onChange={handleChange}
                >
                </textarea>
                { validationError.info && <ErrorValidationText error={validationError.info} /> }
            </div>
            <h4 className="text-2xl font-extrabold text-black">Your data</h4>
            <div className="flex flex-col items-center w-full m-3"> 
                <label htmlFor="name">Full name</label>
                <CustomInput type={"text"} name={"name"} placeholder={"Name"} handleChange={handleChange} required={true} />
                { validationError.name && <ErrorValidationText error={validationError.name} /> }
            </div>
            <div className="flex flex-col items-center w-full m-3"> 
                <label htmlFor="email">Email</label>
                <CustomInput type={"email"} name={"email"} placeholder={"Email"} handleChange={handleChange} required={true} />
                { validationError.email && <ErrorValidationText error={validationError.email} /> }
            </div>

            <SubmitButton loginError={submitError} text="Send"/>
        </form>
    )
}