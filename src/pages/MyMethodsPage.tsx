import { MethodsListComponent } from "../components/methods_components/MethodsListComponent";


export const MyMethodsPage = () => {
    
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-blue-700">My methods</h1>
            <div className="flex flex-col items-center w-3/4 p-4 rounded-md border bg-white">
                <MethodsListComponent />
            </div>
        </div>
    )
}