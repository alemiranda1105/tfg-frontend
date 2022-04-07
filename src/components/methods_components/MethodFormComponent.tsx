import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { AuthContext } from "../../auth/AuthContextProvider";
import { validateText } from "../../helpers/FormValidationHelper";
import { useFetch } from "../../hooks/useFetch";
import { CustomInput } from "../custom_components/CustomInput";
import { ErrorValidationText } from "../custom_components/ErrorValidationText";
import { SubmitButton } from "../custom_components/SubmitButton";
import { UploadMethodComponent } from "../custom_components/UploadMethodComponent";
import { MethodInterface } from "../../interface/MethodInterface";
import { NewMethodInterface } from "../../interface/NewMethodInterface";


interface MethodFormProps {
    methodId: string | "",
    withMethod: boolean
    withFile: boolean,
    action: string,
    actionUrl: string
}

// Reusable form component
export const MethodFormComponent = ({methodId, withMethod, withFile, action, actionUrl}: MethodFormProps) => {
    const { user_id } = useContext(AuthContext);
    const { data: oldMethod, isPending, error }  = useFetch<MethodInterface, undefined>(`methods/${methodId}`);

    // form states
    const [submitted, setSubmitted] = useState(false);
    const [uploading, setUploading] = useState(false);

    // error states
    const [submitError, setSubmitError] = useState("");
    const [validationError, setValidationError] = useState({
        info: "",
        link: "",
        source_code: "",
        name: "",
        user_id: "",
        file: ""
    });

    // data from form and validation
    const [submitData, setSubmitData] = useState<NewMethodInterface>({
        info: "",
        link: "",
        source_code: "",
        name: "",
        user_id: getCookie('user_id'),
        private: false,
        anonymous: false,
        results: []
    });
    // data adapted to be sent to API
    const [formData, setFormData] = useState<FormData>();

    // data fetched from the API after submit
    const [newData, setNewData] = useState<MethodInterface>();

    const handleChange = (e: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;

        // Validation
        var validation: string = "";
        if(name === "name") {
            validation = validateText(value, 25, 3);
        } else if(name === "info") {
            validation = validateText(value, 200, 5);
        } else if(name === "link" || name === "source_code") {
            validation = validateText(value, 50, 3, /^(http|https)/);
        }

        setValidationError(prevState => ({
            ...prevState,
            [name]: validation
        }));
        
        setSubmitData(prevState => ({
            ...prevState,
            [name]: value
        }));

        var newFormData = formData || new FormData();
        newFormData.delete('data');
        newFormData.append('data', JSON.stringify(submitData));
        setFormData(newFormData);
    }

    // check before submit
    const checkValidation = () => {
        var validate = true;
        Object.entries(validationError).forEach(entry => {
            const [, value] = entry;
            if(value !== "") {
                setSubmitError("Check the data and try again");
                validate = false;
                return;
            }
        });
        return validate;
    }

    const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.files) {
            const newFile = e.currentTarget.files;
            var newFormData = formData || new FormData();
            newFormData.delete('file');
            newFormData.append('file', newFile[0], `method_${user_id}.zip`);
            setFormData(newFormData);
        } else {
            setValidationError(prevState => ({
                ...prevState,
                file: "Introduzca un archivo válido"
            }));
        }
    }

    const handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        var priv = (value === "private");
        setSubmitData(prevState => ({
            ...prevState,
            private: priv
        }));
        var newFormData = formData || new FormData();
        newFormData.delete('data');
        newFormData.append('data', JSON.stringify(submitData));
        setFormData(newFormData);
    }

    const handleCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { checked } = e.currentTarget;
        setSubmitData(prevState => ({
            ...prevState,
            anonymous: checked
        }));
        var newFormData = formData || new FormData();
        newFormData.delete('data');
        newFormData.append('data', JSON.stringify(submitData));
        setFormData(newFormData);
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(checkValidation()) {
            if(formData) {            
                setSubmitted(true);
                setUploading(true);
            } else {
                setSubmitError("Check the inputs, please");
            }
        }
    }

    useEffect(() => {
        if(submitError !== "") {
            setSubmitted(false);
            setUploading(false);
        }

        // updates form data
        if(!formData && oldMethod) {
            let newFormData = new FormData();
            newFormData.append('data', JSON.stringify(oldMethod));
            setFormData(newFormData);
        } else {
            var newFormData = formData || new FormData();
            newFormData.delete('data');
            newFormData.append('data', JSON.stringify(submitData));
            setFormData(newFormData);
        }

        // Method has not been edited and there is an old one
        // Old data is added to new method
        if(oldMethod && Object.values(submitData).includes("")) {
            // Removes Id from old data
            const oldData = Object.entries(oldMethod).reduce((newObj, [key, val]) => {
                if(key === 'id' || !val) {
                    return newObj;
                }
                return {
                    ...newObj,
                    [key]: val
                }
            }, {});
            setSubmitData(oldData as NewMethodInterface);
        }
    }, [submitError, formData, oldMethod, submitData, user_id, withMethod])

    return(
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md border bg-white">
            {
                !uploading && !submitError && newData &&
                <>
                    <h1>Updated successfully</h1>
                    <Link to={`/method_details/${newData.id}`} className="font-light p-3">See the method and results</Link>
                </>
            }
            {
                uploading && formData &&
                <UploadMethodComponent url={actionUrl} method={action} uploadData={formData} setData={setNewData} setUploading={setUploading} setError={setSubmitError} />
            }
            {
                withMethod && error && !isPending &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-lg'>Something went wrong</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
            }
            {
                (!withMethod || oldMethod) && !uploading && !submitted &&
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="name">Name:</label>
                        <CustomInput type={"text"} name={"name"} placeholder={"Name"} handleChange={handleChange} required={true} value={oldMethod?.name} />
                        {validationError.name && <ErrorValidationText error={validationError.name}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="info">Information:</label>
                        <textarea
                        onChange={handleChange}
                        className="border rounded-md w-full md:w-1/3 py-1 px-2 max-w-xs focus:border-blue-500 outline-none ease-in-out duration-300"
                        defaultValue={oldMethod?.info}
                        name="info" id="info" cols={50} rows={10} placeholder="Information">
                        </textarea>
                        {validationError.info && <ErrorValidationText error={validationError.info}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="link">Link:</label>
                        <CustomInput type={"text"} name={"link"} placeholder={"Link"} handleChange={handleChange} required={true} value={oldMethod?.link} />
                        <h6 className="text-sm font-light m-1">Please, submit a full URL: https://www.example.com</h6>
                        {validationError.link && <ErrorValidationText error={validationError.link}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3"> 
                        <label htmlFor="source_code">Source code repository:</label>
                        <CustomInput type={"text"} name={"source_code"} placeholder={"Source code"} handleChange={handleChange} required={false} value={oldMethod?.source_code} />
                        <h6 className="text-sm font-light m-1">Please, submit a full URL: https://www.example.com</h6>
                        {validationError.source_code && <ErrorValidationText error={validationError.source_code}/>}
                    </div>
                    <div className="flex flex-col items-center w-full m-3">
                        <h6 className="m-1 font-bold">Privacy</h6>
                        <label htmlFor="private">Private</label>
                        <CustomInput type={"radio"} name={"privacy"} placeholder={""} handleChange={handleRadioChange} required={true} value={"private"} defaultChecked={oldMethod? oldMethod.private: false} />
                        <label htmlFor="public">Public</label>
                        <CustomInput type={"radio"} name={"privacy"} placeholder={""} handleChange={handleRadioChange} required={true} value={"public"} defaultChecked={oldMethod? !oldMethod.private: true}/>
                    </div>
                    {
                        ((oldMethod && oldMethod.anonymous) || !submitData.private) &&
                        <>
                            <label htmlFor="anonymous">Anonymous</label>
                            <CustomInput type={"checkbox"} name={"anonymous"} placeholder={""} handleChange={handleCheckboxChange} required={false} defaultChecked={oldMethod  && oldMethod.anonymous}/>
                        </>
                    }
                    {
                        withFile &&
                        <div className="flex flex-col items-center w-full m-3"> 
                            <label htmlFor="file">Files:</label>
                            <CustomInput type={"file"} name={"file"} accept={"zip,application/zip,application/x-zip,application/x-zip-compressed"} placeholder={""} handleChange={handleFileChange} required={true} />
                            <h6 className="text-sm font-light m-1">Only files with .zip extension</h6>
                            {validationError.file && <ErrorValidationText error={validationError.file}/>}
                        </div>
                    }

                    <SubmitButton loginError={submitError} text="Upload method"/>
                </form>
            }
        </div>
    )

}