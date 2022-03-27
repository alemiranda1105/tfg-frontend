import { descriptionText } from "../mock/MockedTextPresentation";


export function FAQPage() {
    return (
        <div className="flex flex-col justify-between items-center">
            <h1 className="text-3xl font-extrabold text-blue-700">FAQ</h1>
            <section className="mx-5 my-2">
                <h2 className="text-2xl font-bold tracking-wide leading-10 text-blue-700">
                    Question 1
                </h2>
                <div className="p-3 rounded-md border bg-white">
                    <p>
                        {descriptionText}
                    </p>
                </div>
            </section>
            <section className="mx-5 my-2">
                <h2 className="text-2xl font-bold tracking-wide leading-10 text-blue-700">
                    Question 2
                </h2>
                <div className="p-3 rounded-md border bg-white">
                    <p>
                        {descriptionText}
                    </p>
                </div>
            </section>
            <section className="mx-5 my-2">
                <h2 className="text-2xl font-bold tracking-wide leading-10 text-blue-700">
                    Question 3
                </h2>
                <div className="p-3 rounded-md border bg-white">
                    <p>
                        {descriptionText}
                    </p>
                </div>
            </section>
        </div>
    )
}