import { useEffect, useState } from "react"

import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

import { validateText } from "../../helpers/FormValidationHelper"
import { ContentInterface } from "../../interface/ContentInterface"
import { CustomInput } from "../custom_components/CustomInput"
import { ErrorValidationText } from "../custom_components/ErrorValidationText"
import { SubmitButton } from "../custom_components/SubmitButton"
import { UploadContentComponent } from "./UploadContentComponent"

interface ContentFormProps {
    content: ContentInterface,
    method: string
    content_id: string
}

export const ContentForm = ({content, method, content_id}: ContentFormProps) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const [uploading, setUploading] = useState(false);
    const [contentData, setContentData] = useState({
        title: "",
        text: "",
        page: "home"
    });

    const [validationError, setValidationError] = useState({
        title: "",
        text: "",
        submit: ""
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement|HTMLSelectElement>) => {
        const {name, value} = e.currentTarget;
        if(name === "title") {
            let validation = validateText(value, 250, 3);
            setValidationError(prevState => ({
                ...prevState,
                [name]: validation
            }));
        }
        setContentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleContentChange = (cont: string) => {
        let validation = validateText(cont, Number.MAX_VALUE, 10);
        setValidationError(prev => ({
            ...prev,
            text: validation
        }))
        setContentData(prev => ({
            ...prev,
            text: cont
        }))
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
        if(checkValidation() && contentData.page !== "") {
            setUploading(true);
        } else {
            setValidationError(prev => ({
                ...prev,
                submit: "Check all the fields and try again"
            }))
        }
    }

    useEffect(() => {
        const {text, title, page} = content
        if(content && contentData.text === "" && contentData.title === "") {
            if(page === "") {
                setContentData({
                    title: title,
                    text: text,
                    page: "home"
                })
            } else {
                setContentData({text, title, page});
            }
        }
    }, [content, contentData.text, contentData.title])

    return (
        <>
            {
                uploading &&
                <UploadContentComponent content={contentData} method={method} content_id={content_id} />
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
                        <label className="font-light text-lg" htmlFor="page-selector">Page</label>
                        <select name="page" id="page-selector" className="p-2 rounded border" onChange={handleChange}>
                            <option value="home">Home</option>
                            <option value="download_dataset">Download dataset</option>
                            <option value="faq">FAQ</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-center p-2.5 m-2 mb-8 w-full h-11/12">
                        <ReactQuill 
                                preserveWhitespace
                                modules={modules}
                                formats={formats}
                                placeholder="Content"
                                defaultValue={content.text}
                                onChange={handleContentChange}
                                className="w-full h-full"
                            />
                        {validationError.text && <ErrorValidationText error={validationError.text}/>}
                    </div>

                    <SubmitButton loginError={""} text="Upload content"/>
                </form>
            }
        </>
    )
}