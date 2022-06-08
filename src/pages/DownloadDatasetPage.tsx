import { useState } from 'react';
import { ContentListComponent } from '../components/content_components/ContentListComponent';
import { DownloadLinksComponent } from '../components/download_components/DownloadLinksComponent';
import { fieldDescription } from '../mock/MockedTextPresentation';
import { fieldDescription as fieldsJson } from '../interface/FieldDescription';

import { HiOutlineDocumentDownload } from 'react-icons/hi'

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