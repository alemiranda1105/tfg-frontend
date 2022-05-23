import { useState } from 'react';
import { ContentListComponent } from '../components/content_components/ContentListComponent';
import { DownloadLinksComponent } from '../components/download_components/DownloadLinksComponent';
import { fieldDescription } from '../mock/MockedTextPresentation';
import { fieldDescription as fieldsJson } from '../interface/FieldDescription';

import { HiOutlineDocumentDownload } from 'react-icons/hi'

import folder_img from '../res/dataset/folders.png';
import result_img from '../res/dataset/result-files.png';

import test_dataset from '../res/dataset/test-dataset.png'
import training_dataset from '../res/dataset/training-dataset.png'

export function DownloadDatasetPage() {
    const [show, setShow] = useState(false);

    const showClick = () => {
        setShow(!show)
    }

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(fieldsJson)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "fields_meaning.json";
    
        link.click();
    };

    return (
        <div className='flex flex-col justify-center items-center text-center'>
            <h1 className="section-title">
                Download our dataset
            </h1>
            
            <DownloadLinksComponent />

            <ContentListComponent page={"download_dataset"}/>

            <div className='flex flex-col items-center w-full bg-white rounded m-2 p-3'>
                <section className='flex border-b-2 border-black flex-col items-start w-3/4 m-2'>
                    <h3 className='section-small-title'>Information</h3>
                    <p className='font-lg m-1 p-1 text-justify'>
                        El dataset que ofrecemos a los investigadores se encuentra divido en <strong>9 templates</strong>, cada una de estas clases está compuesta con <strong>5000 PDF </strong> 
                        de facturas eléctricas con todos los campos a evaluar. <br />
                        Además, se ofrece un dataset de entrenamiento para que puedas probar tus métodos antes de realizar la evaluación real y subir los resultados a la plataforma.
                        Este conjunto de tests, se encuentra divido en <strong>6 clases</strong> con <strong>5000 PDF</strong> y otros <strong>5000 JSON</strong> para que puedas comprobar
                        los resultados esperados en cada caso por cada campo de manera sencilla. <br />
                        Al final de esta página, podrá encontrar que significa cada campo.
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
                </section>
                <section className="flex border-b-2 border-black flex-col items-start w-3/4 m-2">
                    <h3 className='section-small-title'>Results</h3>
                    <p className='font-lg m-1 p-1 text-justify'>
                        Una vez ejecutado el método de extracción, deberá obtener las carpetas en el siguiente formato con los 
                        resultados con el fin de que la evaluación sea exitosa.
                    </p>
                    <div className='flex flex-col items-center text-justify w-full'>
                        <img src={folder_img} alt="carpetas de los resultados" className='rounded m-3 w-1/2 shadow active:scale-150 transition-all duration-500 ease-in-out' />
                    </div>
                    <p>
                        Dentro de cada carpeta, los resultados estarán ordenados de la siguiente manera y en formato <code>.json</code> para que sean
                        leídos y procesados correctamente.
                    </p>
                    <div className='flex flex-col items-center text-justify w-full'>
                       <img src={result_img} alt="Ejemplo de archivos" className='rounded m-3 w-1/2 shadow active:scale-150 transition-all duration-500 ease-in-out' />
                    </div>
                </section>
                <section className="flex flex-col items-center w-3/4 p-2.5 m-2">
                    <h3 className='section-small-title'>Field's meaning</h3>
                    <p>If you press in the next button, the defintion of each field will appear</p>
                    <p>And also, you can download the meaning of the fields pressing the download button</p>
                    <button
                    className='flex items-center p-2 m-1 mb-3 border rounded bg-blue-200 font-bold shadow hover:shadow-none'
                    onClick={exportData}
                    >
                        <HiOutlineDocumentDownload size={22} />
                        Download JSON
                    </button>
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
                </section>
                
            </div>
        </div>
    )
}