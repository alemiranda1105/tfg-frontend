import { useState, useEffect } from "react";
import { validateText } from "../../helpers/FormValidationHelper";
import { ChangelogInterface } from "../../interface/ChangelogInterface";
import { CustomInput } from "../custom_components/CustomInput";
import { ErrorValidationText } from "../custom_components/ErrorValidationText";
import { SubmitButton } from "../custom_components/SubmitButton";
import { UploadChangelogComponent } from "./UploadChangelogComponent";

interface ChangelogFormProps {
    changelog: ChangelogInterface,
    method: string
    changelog_id: string
}

export const ChangelogForm = ({changelog, method, changelog_id}: ChangelogFormProps) => {
    const [uploading, setUploading] = useState(false);
    const [changelogData, setChangelogData] = useState({
        date: "",
        description: ""
    });

    const [validationError, setValidationError] = useState({
        description: "",
        date: "",
        submit: ""
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        var validation = "";
        if(name === "description") {
            validation = validateText(value, 10000, 5);
            setChangelogData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            const [y, m, d] = value.split("-");
            const date = [d,m,y].join("/");
            setChangelogData(prevState => ({
                ...prevState,
                [name]: date
            }));
        }
        setValidationError(prevState => ({
            ...prevState,
            [name]: validation
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
        const {date, description} = changelog
        if(changelogData.description === "" && changelogData.date === "") {
            setChangelogData({date, description});
        }
    }, [changelog, changelogData.description, changelogData.date])

    return (
        <>
            {
                uploading &&
                <UploadChangelogComponent changelog={changelogData} method={method} changelog_id={changelog_id} />
            }
            {
                !uploading &&
                <form className="flex flex-col items-center content-center w-3/4 shadow rounded" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center m-3 w-full">
                        <label className="font-light text-lg" htmlFor="Title">Title</label>
                        <CustomInput type={"text"} name={"description"} placeholder={"description"} handleChange={handleChange} required={true} value={changelog.description} />
                        {validationError.description && <ErrorValidationText error={validationError.description}/>}
                    </div>
                    <div className="flex flex-col items-center m-3 w-full">
                        <label className="font-light text-lg" htmlFor="text">Date</label>
                        <input type="date" name="date" id="date" defaultValue={changelog.date} onChange={handleChange} required />
                        {validationError.date && <ErrorValidationText error={validationError.date}/>}
                    </div>

                    <SubmitButton loginError={""} text="Upload changelog"/>
                </form>
            }
        </>
    )
}