import { ContentInterface } from "../../interface/ContentInterface";

interface ContentComponentProps {
    content: ContentInterface
}


export const ContentComponent = ({ content }: ContentComponentProps) => {
    return (
        <section className="m-5 flex flex-col items-start border-b-2 border-b-black">
            <h2 className="section-title">
                {content.title}
            </h2>
            <div className="p-3 text-left">
                <p>{content.text}</p>
            </div>
        </section>
    )
}