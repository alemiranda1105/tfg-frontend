import { useEffect, useState } from "react"
import { ErrorValidationText } from "./ErrorValidationText"


interface ButtonProps {
    text?: string
    loginError: string
}

export const SubmitButton = ({loginError, text}: ButtonProps) => {
    const [error, setError] = useState(loginError);

    useEffect(() => {
        setError(loginError);
    }, [loginError])

    return(
        <div className="flex flex-col items-center w-full mt-5">
            <button type="submit" className="px-3 py-2 mb-2 rounded-md bg-slate-300 text-black font-bold hover:bg-blue-400 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none">
                {text? text: "Complete registration"}
            </button>
            {error && <ErrorValidationText error={error} />}
        </div>
    )
}