import { Link, Outlet } from "react-router-dom";

export function ResultsDetailsPage() {

    return (
        <>
        <div className="flex flex-col items-center">
            <h1 className="section-title">Results details</h1>
            <div className="flex flex-wrap justify-center items-center content-center w-full">
                <Link 
                to="by_template"
                className="px-3 py-2 m-2 bg-slate-200 rounded-md text-black font-bold hover:shadow transition-all duration-300"
                >
                    By template
                </Link>
                <Link 
                to="by_field_template"
                className="px-3 py-2 m-2 bg-slate-200 rounded-md text-black font-bold hover:shadow transition-all duration-300"
                >
                    By field and template
                </Link>
                <Link 
                to="by_field"
                className="px-3 py-2 m-2 bg-slate-200 rounded-md text-black font-bold hover:shadow transition-all duration-300"
                >
                    By field
                </Link>
            </div>
            <Outlet />
        </div>
        </>
    )
}