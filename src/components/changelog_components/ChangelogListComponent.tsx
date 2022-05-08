import { useContext } from "react";
import { v4 } from "uuid";
import { AuthContext } from "../../auth/AuthContextProvider";
import { useFetch } from "../../hooks/useFetch"
import { ChangelogInterface } from "../../interface/ChangelogInterface";
import { LoadingComponent } from "../custom_components/LoadingComponent";
import { ChangelogComponent } from "./ChangelogComponent";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";


export function ChangelogListComponent() {
    const { data, isPending } = useFetch<ChangelogInterface[], undefined>("changelog/");
    const { role } = useContext(AuthContext);

    return (
        <section className="my-5 flex flex-col items-start border-b-2 w-3/4 border-b-black">
            <div className="flex items-center content-center justify-center">
                <h2 className="section-title">
                    Changelog
                </h2>
                {
                    (role === "admin") &&
                    <>
                        <Link
                        aria-label="Add changes to changelog"
                        className="mr-3 ml-2 px-2.5 hover:scale-125 hover:text-blue-500 transition duration-300"
                        to="/add_changelog">
                            <FiPlus size={22}/>
                        </Link>
                    </>
                }
            </div>
            <div className="p-3 text-left w-full">
                
                {
                    isPending &&
                    <LoadingComponent />
                }
                {
                    data &&
                    <ul className="list-disc w-full">
                        {
                            data.map(changelog => {
                                return (
                                    <ChangelogComponent changelog={changelog} key={v4()}/>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        </section>
    )
}