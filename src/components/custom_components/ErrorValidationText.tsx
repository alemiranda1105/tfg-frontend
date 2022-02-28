
interface ErrorText {
    error: string
}

export function ErrorValidationText({error}: ErrorText) {
    return (
        <>
            <h4 className="text-red-600 font-light text-sm">{error}</h4>
        </>
    )
}