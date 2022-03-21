
import { DownloadButton } from '../components/download_components/DownloadButton';
import { characteristicsText } from '../mock/MockedTextPresentation';
import '../styles/DownloadDatasetPage.css';

export function DownloadDatasetPage() {
    return(
        <div className='flex flex-col justify-center items-center text-center'>
            <h1 className="title">
                Descarga nuestro dataset
            </h1>
            <div className='flex flex-col items-center w-3/4 bg-white rounded m-2 p-3'>
                <h3 className='small-title'>Información</h3>
                <p className='font-lg m-1 p-1 text-justify'>
                    {characteristicsText}
                </p>
                <DownloadButton text={'Descargar'} url={'dataset'} fileType={'application/x-zip-compressed'} />
            </div>
        </div>
    )
}