

export const DownloadLinksComponent = () => {
    const url = {
        full: process.env.REACT_APP_FULL_DATASET_URL + "",
        train: process.env.REACT_APP_TRAIN_DATASET_URL + "",
        test: process.env.REACT_APP_TEST_DATASET_URL + "",
    }
    return (
        <div className='m-3 w-full md:w-1/3 border rounded flex flex-col'>
            <h3 className='font-semibold text-lg'>Download links</h3>
            <a
            className='underline hover:text-blue-500 hover:font-semibold transition duration-300 p-2'
            href={url.full}>
                Full (31.8GB)
            </a>
            <a
            className='underline hover:text-blue-500 hover:font-semibold transition duration-300 p-2'
            href={url.test}>
                Test (17.6GB)
            </a>
            <a
            className='underline hover:text-blue-500 hover:font-semibold transition duration-300 p-2'
            href={url.train}>
                Training (14.1GB)
            </a>
        </div>
    )
}