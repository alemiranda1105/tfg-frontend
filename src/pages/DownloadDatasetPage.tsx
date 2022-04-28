import { useState } from 'react';
import { characteristicsText, fieldDescription } from '../mock/MockedTextPresentation';

import folder_img from '../res/dataset/folders.png';
import result_img from '../res/dataset/result-files.png';

import test_dataset from '../res/dataset/test-dataset.png'
import training_dataset from '../res/dataset/training-dataset.png'

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
            <div className='flex flex-col items-center sm:w-full md:w-1/2 bg-white rounded m-2 p-3'>
                <h3 className='section-small-title'>Information</h3>
                <p className='font-lg m-1 p-1 text-justify'>
                    El dataset que ofrecemos a los investigadores se encuentra divido en <strong>9 clases</strong>, cada una de estas clases está compuesta con <strong>5000 PDF</strong> 
                    de facturas eléctricas con todos los campos a evaluar. <br />
                    Además, se ofrece un dataset de entrenamiento para que puedas probar tus métodos antes de realizar la evaluación real y subir los resultados a la plataforma.
                    Este conjunto de tests, se encuentra divido en <strong>6 clases</strong> con <strong>5000 PDF</strong> y otros <strong>5000 JSON</strong> para que puedas comprobar
                    los resultados esperados en cada caso por cada campo de manera sencilla. <br />
                    Al final de esta página, podrás encontrar que significa cada campo.
                </p>
                <div className="flex justify-evenly content-evenly w-full m-2">
                    <div className="w-full flex flex-col justify-center content-center items-center">
                        <img src={test_dataset} alt="Test dataset example" className='rounded m-3 w-3/4 shadow active:scale-150 transition-all duration-500 ease-in-out' />
                        <h4 className='font-light'>Test dataset</h4>
                    </div>
                    <div className="w-full flex flex-col justify-center content-center items-center">
                        <img src={training_dataset} alt="Training dataset example" className='rounded m-3 w-3/4 shadow active:scale-150 transition-all duration-500 ease-in-out' />
                        <h4 className='font-light'>Training dataset</h4>
                    </div>
                </div>
                <h3 className='section-small-title'>Results</h3>
                <p className='font-lg m-1 p-1 text-justify'>
                    Una vez ejecutado el método de extracción, deberá obtener las carpetas en el siguiente formato con los 
                    resultados con el fin de que la evaluación sea exitosa.
                </p>
                <div className='flex flex-col items-center text-justify'>
                    <img src={folder_img} alt="carpetas de los resultados" className='rounded m-3 w-1/2 shadow active:scale-150 transition-all duration-500 ease-in-out' />
                    <p>
                        Dentro de cada carpeta, los resultados estarán ordenados de la siguiente manera y en formato <code>.json</code> para que sean
                        leídos y procesados correctamente.
                    </p>
                    <img src={result_img} alt="Ejemplo de archivos" className='rounded m-3 w-1/2 shadow active:scale-150 transition-all duration-500 ease-in-out' />
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
                    <div className="text-left border rounded p-1 bg-slate-100 w-full overflow-scroll">
                        <pre>
                            {fieldDescription}
                        </pre>
                    </div>
                }

                <div className='m-3 w-full md:w-1/3 border rounded flex flex-col'>
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