

interface InputProps {
    type: string,
    name: string,
    placeholder: string,
    required: boolean,
    value?: string | number,
    accept?: string,
    defaultChecked?: boolean
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export function CustomInput({type, name, placeholder, required, value, accept, defaultChecked, handleChange}: InputProps) {
    return(
        <>
            <input type={type} name={name} placeholder={placeholder} id={name} onChange={handleChange} required={required} accept={accept} defaultValue={value} defaultChecked={defaultChecked}
            className="border rounded-md w-full md:w-1/3 py-1 px-2 max-w-xs focus:border-blue-500 outline-none ease-in-out duration-300"
            />
        </>
    )
}