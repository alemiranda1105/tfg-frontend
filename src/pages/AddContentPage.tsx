import { ContentForm } from "../components/content_components/ContentForm";


export function AddContentPage () {
    return (
        <div className="flex flex-col items-center">
            <h1 className="section-title">Add content to the website</h1>
            <ContentForm content={{ id: "", title: "", text: "" }} method={"post"} content_id={""}/>
        </div>
    )
}