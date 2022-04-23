import { useContext } from "react"
import { AuthContext } from "../../auth/AuthContextProvider"
import { ChangelogInterface } from "../../interface/ChangelogInterface"

interface ChangelogComponentProps {
    changelog: ChangelogInterface,
}

export const ChangelogComponent = ({ changelog }: ChangelogComponentProps) => {
    const { role } = useContext(AuthContext);
    return(
        <li className="m-2">
            <strong><i>{changelog.date}:</i></strong> {changelog.description}
            {
                (role === "admin") &&
                <div>
                    <button>
                        Edit
                    </button>
                    <button>
                        Delete
                    </button>
                </div>
            }
        </li>
    )
}