import { useState } from 'react';
import { characteristicsText, fieldDescription } from '../mock/MockedTextPresentation';

import folder_img from '../res/dataset/folders.png';
import result_img from '../res/dataset/result-files.png';

export function DownloadDatasetPage() {
    const [show, setShow] = useState(false);

    const showClick = () => {
        setShow(!show)
    }

    return (
        <div className='flex flex-col justify-center items-center text-center'>
            <h1 className="section-title">
                Download our dataset
            </h1>
            <div className='flex flex-col items-center w-3/4 bg-white rounded m-2 p-3'>
                <h3 className='section-small-title'>Information</h3>
                <p className='font-lg m-1 p-1 text-justify'>
                    {characteristicsText}
                </p>
                <div className='flex flex-col items-center text-justify'>
                    <img src={folder_img} alt="carpetas de los resultados" className='rounded m-3 w-2/3 shadow active:scale-150 transition-all duration-500 ease-in-out' />
                    <p>
                        The results must be inside folders as it can be seen in the image above to allow our platform to evaluate them.
                        Inside each folder, files with <code>.json</code> extension must be found with the obtained results in each category. For example:
                    </p>
                    <img src={result_img} alt="Ejemplo de archivos" className='rounded m-3 w-2/3 shadow active:scale-150 transition-all duration-500 ease-in-out' />
                </div>
                <h3 className='section-small-title'>Field's meaning</h3>
                <p>If you press in the next button, the defintion of each field will appear</p>
                <button
                className='p-2 m-1 border rounded bg-slate-200 font-bold shadow hover:shadow-none'
                onClick={() => showClick()}
                >
                    {
                        show &&
                        "Hide definitions"
                    }
                    {
                        !show &&
                        "Show definitions"
                    }
                </button>
                {
                    show &&
                    <div className="text-left border rounded p-1 bg-slate-100">
                        <pre>
                            {fieldDescription}
                        </pre>
                    </div>
                }

                <div className='m-3 w-full border rounded flex flex-col'>
                    <h3 className='font-semibold text-lg'>Download links</h3>
                    <a
                    className='underline hover:text-blue-500 hover:font-semibold transition duration-300 p-2'
                    href="https://alumnosulpgc-my.sharepoint.com/:u:/g/personal/jsanchez_ulpgc_es/EVzjDUXQgupFpMhq6ERMFd4BMVhQYhRTNG7dHsUHgH7BZQ">
                        OneDrive
                    </a>
                    <a
                    className='underline hover:text-blue-500 hover:font-semibold transition duration-300 p-2'
                    href="https://zenodo.org/record/6373179/files/idsem.zip?download=1">
                        Zenodo
                    </a>
                </div>
            </div>
        </div>
    )
}