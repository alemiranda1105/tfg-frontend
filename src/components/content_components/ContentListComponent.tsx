import { v4 } from "uuid";
import { useFetch } from "../../hooks/useFetch"
import { ContentInterface } from "../../interface/ContentInterface";
import { LoadingComponent } from "../custom_components/LoadingComponent";
import { ContentComponent } from "./ContentComponent";

interface ContentListProps {
    page: string
}

export const ContentListComponent = ({ page }: ContentListProps) => {
    const { data: contentList, isPending } = useFetch<ContentInterface[], undefined>("content/page/" + page);

    return (
        <div className="flex flex-col w-full">
            {
                isPending &&
                <LoadingComponent />
            }
            {
                !isPending && contentList &&
                <div className="flex flex-col items-center">
                    {contentList.map(content => <ContentComponent content={content} key={v4()}/>)}
                </div>
            }
        </div>
    )
}