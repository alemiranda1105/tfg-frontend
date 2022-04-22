import { ContentListComponent } from "../components/content_components/ContentListComponent";

import '../styles/PresentationPage.css';

export const PresentationPage = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="flex text-center justify-center items-center w-full h-1/2 parallax m-2 rounded">
                <h1 className="text-4xl font-extrabold text-black shadow-lg p-3 rounded bg-white/70">IDSEM Dataset</h1>
            </div>
            <div className="flex flex-col items-center">
                <ContentListComponent />
            </div>
        </div>
    )
};
