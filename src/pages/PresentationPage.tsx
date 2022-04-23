import { ChangelogListComponent } from "../components/changelog_components/ChangelogListComponent";
import { ContentListComponent } from "../components/content_components/ContentListComponent";
import { copyrightText, citationLaText } from "../mock/MockedTextPresentation";

import '../styles/PresentationPage.css';

export const PresentationPage = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="flex text-center justify-center items-center w-full h-1/2 parallax m-2 rounded">
                <h1 className="text-4xl font-extrabold text-black shadow-lg p-3 rounded bg-white/70">IDSEM Dataset</h1>
            </div>
            <div className="flex flex-col items-center">
                <ContentListComponent />

                <section className="my-5 flex flex-col items-start border-b-2 w-11/12 border-b-black">
                    <h2 className="section-title">
                        News
                    </h2>
                    <div className="p-3 text-left">
                        <h3 className="text-semibold text-lg">This are the website news</h3>
                    </div>
                </section>

                <section className="my-5 flex flex-col items-start border-b-2 w-11/12 border-b-black">
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
                
                <section className="my-5 flex flex-col items-start border-b-2 w-11/12 border-b-black">
                    <h2 className="section-title">
                        Citation
                    </h2>
                    <div className="flex flex-col p-3 w-full text-left">
                        <p>When using this dataset in your research, we would like if you cite us</p>
                        <h3 className="font-bold text-lg m-2">LaTex</h3>
                        <div className="p-2 bg-slate-100 rounded w-full md:w-1/3 max-w-sm overflow-auto">
                            <pre>
                                {citationLaText}
                            </pre>
                        </div>
                    </div>
                </section>
                
                <ChangelogListComponent />
            </div>
        </div>
    )
};
