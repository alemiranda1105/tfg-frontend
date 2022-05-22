import { Link } from "react-router-dom";
import { ChangelogListComponent } from "../components/changelog_components/ChangelogListComponent";
import { ContentListComponent } from "../components/content_components/ContentListComponent";
import { DownloadLinksComponent } from "../components/download_components/DownloadLinksComponent";
import { copyrightText, citationLaText } from "../mock/MockedTextPresentation";


import invoice1 from '../res/invoices/invoice1.png'
import invoice2 from '../res/invoices/invoice2.png'
import invoice3 from '../res/invoices/invoice3.png'

export const PresentationPage = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="flex text-center justify-center items-center w-full h-1/2 parallax m-2 rounded">
            </div>
            <div className="flex flex-col items-center">
                <div className="flex w-3/4">
                    <h1 className="text-5xl font-bold text-black m-2 rounded bg-white/70">IDSEM: Electricity Invoices Dataset</h1>
                </div>

                <ContentListComponent page={"home"} />

                <section className="my-5 flex flex-col items-start border-b-2 w-3/4 border-b-black">
                    <h2 className="section-title">
                        Dataset
                    </h2>
                    <h3 className="font-bold text-lg" >Examples of the IDSEM dataset</h3>
                    <div className="flex justify-center content-center w-full m-2">
                        <div className="w-full flex flex-col justify-center content-center items-center">
                            <img src={invoice1} alt="Invoice example" className='rounded m-1 w-2/4 max-w-[300px] active:scale-150 transition-all duration-500 ease-in-out' />
                        </div>
                        <div className="w-full flex flex-col justify-center content-center items-center">
                            <img src={invoice2} alt="Invoice example" className='rounded m-1 w-2/4 max-w-[300px] active:scale-150 transition-all duration-500 ease-in-out' />
                        </div>
                        <div className="w-full flex flex-col justify-center content-center items-center">
                            <img src={invoice3} alt="Invoice example" className='rounded m-1 w-2/4 max-w-[300px] active:scale-150 transition-all duration-500 ease-in-out' />
                        </div>
                    </div>
                    <h3>More information can be found in the Dataset page</h3>
                    <Link to="/download_dataset" 
                    aria-label="Dataset information link"
                    className="underline hover:text-blue-500 hover:font-semibold transition duration-300">
                        Dataset information
                    </Link>
                    <div className="flex justify-center w-full">
                        <DownloadLinksComponent />
                    </div>
                </section>

                <section className="my-5 flex flex-col items-start border-b-2 w-3/4 border-b-black">
                    <h2 className="section-title">
                        Copyright
                    </h2>
                    <div className="p-3 text-left">
                        <p>{copyrightText}</p>
                        <a 
                        className="text-blue-600 underline hover:font-bold"
                        href="https://creativecommons.org/licenses/by-nc-sa/3.0/">
                            Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License
                        </a>
                    </div>
                </section>
                
                <section className="my-5 flex flex-col items-start border-b-2 w-3/4 border-b-black">
                    <h2 className="section-title">
                        Citation
                    </h2>
                    <div className="flex flex-col p-3 w-full text-left">
                        <p>When using this dataset in your research, we would like if you cite us</p>
                        <h3 className="font-bold text-lg m-2">LaTex</h3>
                        <div className="p-2 bg-slate-100 rounded w-full max-w-sm overflow-auto">
                            <pre>
                                {citationLaText}
                            </pre>
                        </div>
                    </div>
                </section>
                
                <ChangelogListComponent />
                
                <section className="my-5 flex flex-col items-start border-b-2 w-3/4 border-b-black">
                    <h2 className="section-title">
                        About us
                    </h2>
                    <div className="flex flex-col p-3 w-full text-left">
                        <div className="m-2">
                            <h4 className="font-bold text-xl">Javier Sánchez</h4>
                            <h5 className="font-light text-md">Ph.D. degree in computer science, University of Las Palmas de Gran Canaria</h5>
                        </div>
                        <div className="m-2">
                            <h4 className="font-bold text-xl">Agustín Salgado</h4>
                            <h5 className="font-light text-md">Ph.D. degree in computer science, University of Las Palmas de Gran Canaria</h5>    
                        </div>
                        <div className="m-2">
                            <h4 className="font-bold text-xl">Alejandro García</h4>
                            <h5 className="font-light text-md">B.S. student degree in computer science, University of Las Palmas de Gran Canaria</h5>
                        </div>
                        <div className="m-2">
                            <h4 className="font-bold text-xl">Nelson Monzón</h4>
                            <h5 className="font-light text-md">Ph.D. degree in computer science, University of Las Palmas de Gran Canaria</h5>
                        </div>
                        <div className="m-2">
                            <h4 className="font-bold text-xl">Alejandro Miranda</h4>
                            <h5 className="font-light text-md">B.S. student degree in computer science, University of Las Palmas de Gran Canaria</h5>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
};
