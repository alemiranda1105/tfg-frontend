import { useEffect, useState } from "react"
import { validateText } from "../../helpers/FormValidationHelper"
import { ContentInterface } from "../../interface/ContentInterface"
import { CustomInput } from "../custom_components/CustomInput"
import { ErrorValidationText } from "../custom_components/ErrorValidationText"
import { SubmitButton } from "../custom_components/SubmitButton"
import { UploadContentComponent } from "./UploadContentComponent"

interface ContentFormProps {
    content: ContentInterface,
    method: string
}

export const ContentForm = ({content, method}: ContentFormProps) => {
    const [uploading, setUploading] = useState(false);
    const [contentData, setContentData] = useState({
        title: "",
        text: ""
    });

    const [validationError, setValidationError] = useState({
        title: "",
        text: "",
        submit: ""
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        var validation = "";
        if(name === "title") {
            validation = validateText(value, 25, 3);
        } else {
            validation = validateText(value, 10000, 10);
        }
        setValidationError(prevState => ({
            ...prevState,
            [name]: validation
        }));
        setContentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // check before submit
    const checkValidation = () => {
        var validate = true;
        Object.entries(validationError).forEach(entry => {
            const [name, value] = entry;
            if(value !== "" && name !== "source_code") {
                setValidationError(prevState => ({
                    ...prevState,
                    submit: "Check the data and try again"
                }));
                validate = false;
                return;
            }
        });
        return validate;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(checkValidation()) {
            setUploading(true);
        }
    }

    useEffect(() => {
        const {text, title} = content
        if(contentData.text === "" && contentData.title === "") {
            setContentData({text, title});
        }
    }, [content, contentData.text, contentData.title])

    return (
        <>
            {
                uploading &&
                <UploadContentComponent content={contentData} method={method} content_id={""} />
            }
            {
                !uploading &&
                <form className="flex flex-col items-center content-center w-3/4 shadow rounded" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center m-3 w-full">
                        <label className="font-light text-lg" htmlFor="Title">Title</label>
                        <CustomInput type={"text"} name={"title"} placeholder={"Title"} handleChange={handleChange} required={true} value={content.title} />
                        {validationError.title && <ErrorValidationText error={validationError.title}/>}
                    </div>
                    <div className="flex flex-col items-center m-3 w-full">
                        <label className="font-light text-lg" htmlFor="text">Content</label>
                        <textarea
                            onChange={handleChange}
                            className="border rounded-md w-full md:w-1/3 py-1 px-2 max-w-xs focus:border-blue-500 outline-none ease-in-out duration-300"
                            defaultValue={content.text}
                            name="text" id="text" cols={50} rows={10} placeholder="Content"
                        >
                        </textarea>
                        {validationError.text && <ErrorValidationText error={validationError.text}/>}
                    </div>

                    <SubmitButton loginError={""} text="Upload content"/>
                </form>
            }
        </>
    )
}