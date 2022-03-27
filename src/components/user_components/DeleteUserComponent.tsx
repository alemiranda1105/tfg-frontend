import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContextProvider";
import { ErrorValidationText } from "../custom_components/ErrorValidationText";


interface DeleteUserProps {
    handleShow: (state: boolean) => void
}


export const DeleteUserComponent = ({handleShow}: DeleteUserProps) => {
    const { user_id, token, setId, setToken, setUsername } = useContext(AuthContext);

    // User confirmation
    const [confirmed, setConfirmed] = useState(false);

    // request state
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.delete(`${process.env.REACT_APP_API_URL}/users/${user_id}`, config)
        .then(res => res.data)
        .then(data => {
            document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setToken("");
            setId("");
            setUsername("");
        })
        .catch(error => {
            if(axios.isAxiosError(error)) {
                setError(error.response?.data.detail);
            } else {
                setError('Something went wrong, please try again');
            }
        });
    }

    return (
        <div className="flex flex-col text-center items-center w-full">
            <h3 className="text-3xl font-bold text-red-500">Attention!</h3>
            <h4 className="text-lg font-semibold">You are about to delete your profile with ALL the data showed in this pages, if you delete it, we will not be able to restore them</h4>
            <button className="px-3 py-2 m-2 rounded-md text-sm bg-blue-500 hover:bg-blue-500/40 text-white" onClick={() => handleShow(false)}>Cancel</button>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <label htmlFor="confirmed" className="font-bold p-3">Confirm</label>
                    <input type="checkbox" name="confirmed" id="confirmed" checked={confirmed} onChange={() => setConfirmed(!confirmed)}/>
                </div>
                {
                    confirmed && token !== "" && user_id !== "" &&
                    <>
                        <button type="submit" className="px-3 py-2 m-2 rounded-md text-sm bg-red-500 hover:bg-red-500/40 text-white">DELETE everything</button>
                        {error && <ErrorValidationText error={error} />}
                    </>
                }
            </form>
        </div>
    )
}