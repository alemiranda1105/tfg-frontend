

export const DownloadLinksComponent = () => {
    return (
        <div className='m-3 w-full md:w-1/3 border rounded flex flex-col'>
            <h3 className='font-semibold text-lg'>Download links</h3>
            <a
            className='underline hover:text-blue-500 hover:font-semibold transition duration-300 p-2'
            href="https://zenodo.org/record/6373179/files/idsem.zip?download=1">
                Link 1
            </a>
            <a
            className='underline hover:text-blue-500 hover:font-semibold transition duration-300 p-2'
            href="https://alumnosulpgc-my.sharepoint.com/:u:/g/personal/jsanchez_ulpgc_es/EVzjDUXQgupFpMhq6ERMFd4BMVhQYhRTNG7dHsUHgH7BZQ">
                Link 2
            </a>
        </div>
    )
}