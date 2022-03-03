

interface InputProps {
    type: string,
    name: string,
    placeholder: string,
    required: boolean,
    value?: string | number,
    accept?: string,
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export function CustomInput({type, name, placeholder, required, value, accept, handleChange}: InputProps) {
    return(
        <>
            <input type={type} name={name} placeholder={placeholder} id={name} onChange={handleChange} required={required} accept={accept} defaultValue={value}
            className="border rounded-md shadow w-full md:w-1/3 py-1 px-2 max-w-xs focus:w-full focus:border focus:border-blue-500 outline-none ease-in-out duration-300"
            />
        </>
    )
}