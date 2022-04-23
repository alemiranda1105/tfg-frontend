import { ChangelogInterface } from "../../interface/ChangelogInterface"

interface ChangelogComponentProps {
    changelog: ChangelogInterface
}

export const ChangelogComponent = ({changelog}: ChangelogComponentProps) => {
    return(
        <li>
            <strong><i>{changelog.date}</i></strong> {changelog.description}
        </li>
    )
}