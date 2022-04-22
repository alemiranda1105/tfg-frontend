
interface ErrorProps {
    msg: string
}

export const ErrorMessageComponent = ({msg}: ErrorProps) => {
    return (
        <div className='flex flex-col items-center text-center'>
            <h3 className='text-2xl font-bold'>Something went wrong</h3>
            <p className='text-sm font-light'>Error: {msg}</p>
        </div>
    )
}