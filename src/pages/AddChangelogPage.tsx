import { ChangelogForm } from "../components/changelog_components/ChangelogForm";


export function AddChangelogPage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="section-title">Add a new change to the website</h1>
            <ChangelogForm changelog={{id: "", description: "", date: ""}} method={"post"} changelog_id={""} />
        </div>
    )

}