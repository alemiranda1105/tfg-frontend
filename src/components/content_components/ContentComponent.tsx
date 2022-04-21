import { ContentInterface } from "../../interface/ContentInterface"

interface ContentComponentProps {
    content: ContentInterface
}


export const ContentComponent = ({ content }: ContentComponentProps) => {
    return (
        <div>
            {content.title}
        </div>
    )
}