import { Link, Outlet } from "react-router-dom";

export function ResultsDetailsPage() {

    return (
        <>
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Results details</h1>
            <div className="flex justify-center items-center content-center">
                <Link 
                to="by_template"
                className="p-2 m-2 rounded bg-blue-500 hover:bg-blue-800 text-white font-bold"
                >
                    By template
                </Link>
                <Link 
                to="by_field"
                className="p-2 m-2 rounded bg-blue-500 hover:bg-blue-800 text-white font-bold"
                >
                    By field
                </Link>
            </div>
            <Outlet />
        </div>
        </>
    )
}