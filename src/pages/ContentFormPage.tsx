import { ContentForm } from "../components/content_components/ContentForm";


export function ContentFormPage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-blue-700">Add content to the website</h1>
            <ContentForm content={{id: "", title: "", text: ""}} />
        </div>
    )
}