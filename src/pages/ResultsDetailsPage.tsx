import { Link, Outlet } from "react-router-dom";

export function ResultsDetailsPage() {

    return (
        <>
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Results details</h1>
            <div className="flex flex-wrap justify-center items-center content-center w-full">
                <Link 
                to="by_template"
                className="p-2 m-2 rounded underline text-blue-500 md:no-underline md:bg-blue-500 md:hover:bg-blue-800 md:text-white font-bold"
                >
                    By template
                </Link>
                <Link 
                to="by_field_template"
                className="p-2 m-2 rounded underline text-blue-500 md:no-underline md:bg-blue-500 md:hover:bg-blue-800 md:text-white font-bold"
                >
                    By field and template
                </Link>
                <Link 
                to="by_field"
                className="p-2 m-2 rounded underline text-blue-500 md:no-underline md:bg-blue-500 md:hover:bg-blue-800 md:text-white font-bold"
                >
                    By field
                </Link>
            </div>
            <Outlet />
        </div>
        </>
    )
}