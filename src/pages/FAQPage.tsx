import { descriptionText } from "../mock/MockedTextPresentation";


export function FAQPage() {
    return (
        <div>
            <section className="mx-5 my-2">
                <h2 className="text-2xl font-bold tracking-wide leading-10 text-blue-700">
                    Descripción
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