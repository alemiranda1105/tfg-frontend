import { v4 } from "uuid";
import { useFetch } from "../../hooks/useFetch"
import { ContentInterface } from "../../interface/ContentInterface";
import { LoadingComponent } from "../custom_components/LoadingComponent";
import { ContentComponent } from "./ContentComponent";


export const ContentListComponent = () => {
    const { data: contentList, isPending, error } = useFetch<ContentInterface[], undefined>("content/");

    return (
        <div className="flex flex-col">
            {
                isPending &&
                <LoadingComponent />
            }
            {
                !isPending && error &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-2xl font-bold'>Something went wrong</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
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