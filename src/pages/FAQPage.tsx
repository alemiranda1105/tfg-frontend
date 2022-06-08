import { ContentListComponent } from "../components/content_components/ContentListComponent";

export function FAQPage() {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="flex flex-col items-center">
                <h1 className="section-title">Frequently asked questions</h1>
                <ContentListComponent page="faq"/>
            </div>
        </div>
    )
}