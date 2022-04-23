import { v4 } from "uuid";
import { useFetch } from "../../hooks/useFetch"
import { ChangelogInterface } from "../../interface/ChangelogInterface";
import { ErrorMessageComponent } from "../custom_components/ErrorMessageComponent";
import { LoadingComponent } from "../custom_components/LoadingComponent";
import { ChangelogComponent } from "./ChangelogComponent";


export function ChangelogListComponent() {
    const { data, isPending, error } = useFetch<ChangelogInterface[], undefined>("changelog/");

    return (
        <section className="my-5 flex flex-col items-start border-b-2 w-11/12 border-b-black">
            <h2 className="section-title">
                Changelog
            </h2>
            <div className="p-3 text-left w-full">
                {
                    isPending &&
                    <LoadingComponent />
                }
                {
                    !isPending && error &&
                    <ErrorMessageComponent msg={error} />
                }
                {
                    data &&
                    data.map(changelog => {
                        return (
                            <ChangelogComponent changelog={changelog} key={v4()}/>
                        )
                    })
                }
            </div>
        </section>
    )
}