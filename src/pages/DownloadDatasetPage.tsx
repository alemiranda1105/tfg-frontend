
import { DownloadButton } from '../components/download_components/DownloadButton';
import { characteristicsText } from '../mock/MockedTextPresentation';

import '../styles/DownloadDatasetPage.css';

import folder_img from '../res/dataset/folders.png';
import result_img from '../res/dataset/result-files.png';

export function DownloadDatasetPage() {
    return(
        <div className='flex flex-col justify-center items-center text-center'>
            <h1 className="title">
                Download our dataset
            </h1>
            <div className='flex flex-col items-center w-3/4 bg-white rounded m-2 p-3'>
                <h3 className='small-title'>Information</h3>
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
                <DownloadButton text={'Download'} url={'dataset'} fileType={'application/x-zip-compressed'} />
            </div>
        </div>
    )
}