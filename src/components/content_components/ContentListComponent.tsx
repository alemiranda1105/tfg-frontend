import { v4 } from "uuid";
import { useFetch } from "../../hooks/useFetch"
import { ContentInterface } from "../../interface/ContentInterface";
import { LoadingComponent } from "../custom_components/LoadingComponent";
import { ContentComponent } from "./ContentComponent";


export const ContentListComponent = () => {
    const { data: contentList, isPending } = useFetch<ContentInterface[], undefined>("content/");

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