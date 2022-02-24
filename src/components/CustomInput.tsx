

interface InputProps {
    type: string,
    name: string,
    placeholder: string,
    required: boolean
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export function CustomInput({type, name, placeholder, required, handleChange}: InputProps) {
    return(
        <>
            <input type={type} name={name} placeholder={placeholder} onChange={handleChange} required={required}
            className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
            />
        </>
    )
}