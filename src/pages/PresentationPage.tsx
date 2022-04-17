import { TextContainer } from "../components/custom_components/TextContainer";
import { characteristicsText, citationLaText, copyrightText, datasetText, descriptionText } from "../mock/MockedTextPresentation";

import '../styles/PresentationPage.css';

export const PresentationPage = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="flex text-center justify-center items-center w-full h-1/2 parallax m-2 rounded">
                <h1 className="text-4xl font-extrabold text-black shadow-lg p-3 rounded bg-white/70">IDSEM Dataset</h1>
            </div>
            <div className="flex flex-col items-center">
                <div className="info-section">
                    <section className="m-5">
                        <div className="text-container">    
                            <h2 className="section-title">
                                Description
                            </h2>
                            <TextContainer text={descriptionText} />
                        </div>
                    </section>
                    <section className="m-5">
                        <div className="text-container">    
                            <h2 className="section-title">
                                Characteristics
                            </h2>
                            <TextContainer text={characteristicsText} />
                        </div>
                    </section>
                    <section className="m-5">
                        <div className="text-container">
                            <h2 className="section-title">
                                Our dataset
                            </h2>
                            <TextContainer text={datasetText}/>
                        </div>
                    </section>
                </div>

                <section className="m-5 flex flex-col items-center w-3/4">
                    <h2 className="section-title">
                        About the database
                    </h2>
                    <div className="p-3 rounded-md border bg-white text-left">
                        <p>
                            {datasetText}
                        </p>
                        <h3 className="text-xl font-semibold tracking-wide leading-10">How is it organized?</h3>
                        <ul className="list-disc list-inside">
                            <li>Name</li>
                            <li>Description</li>
                            <li>Link</li>
                            <h4 className="text-m font-m leading-9 font-semibold">Example:</h4>
                            <p className="text-m font-light">
                                {`{
                                    "id": "1",
                                    "user_id": "1",
                                    "name": "example",
                                    "info": "This is an example",
                                    "link": "example.com",
                                    "results": [
                                        {
                                            "score_1": 0.5912
                                        },
                                        {
                                            "score_2": 0.8745
                                        },
                                        {
                                            "score_3": 0.4478
                                        }
                                    ]
                                }`}
                            </p>
                        </ul>
                    </div>
                </section>

                <section className="m-5 flex flex-col items-center w-3/4">
                    <h2 className="section-title">
                        Copyright
                    </h2>
                    <div className="p-3 rounded-md border bg-white text-left">
                        <p>{copyrightText}</p>
                        <a 
                        className="text-blue-600 underline hover:font-bold"
                        href="https://creativecommons.org/licenses/by-nc-sa/3.0/">
                            Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License
                        </a>
                    </div>
                </section>
                
                <section className="m-5 flex flex-col items-center w-3/4">
                    <h2 className="section-title">
                        Citation
                    </h2>
                    <div className="flex flex-col p-3 rounded-md border bg-white w-full text-left">
                        <p>When using this dataset in your research, we would like if you cite us</p>
                        <h3 className="font-bold text-lg m-2">LaTex</h3>
                        <div className="p-2 bg-slate-100 rounded w-full md:w-1/3 max-w-sm overflow-auto">
                            <pre>
                                {citationLaText}
                            </pre>
                        </div>
                    </div>
                </section>
                
                <section className="m-5 flex flex-col items-center w-3/4">
                    <h2 className="section-title">
                        Changelog
                    </h2>
                    <div className="p-3 rounded-md border bg-white text-left w-full">
                        <h3 className="text-semibold text-lg">This are the recents changes in the website</h3>
                    </div>
                </section>
            </div>
        </div>
    )
};
