

interface InputProps {
    type: string,
    name: string,
    placeholder: string,
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export function CustomInput({type, name, placeholder, handleChange}: InputProps) {
    return(
        <>
            <input type={type} name={name} placeholder={placeholder} onChange={handleChange}/>
        </>
    )
}