import { descriptionText } from "../mock/MockedTextPresentation";


export function FAQPage() {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col justify-between items-center w-3/4">
                <h1 className="section-title">FAQ</h1>
                <section className="mx-5 my-2">
                    <h2 className="section-small-title">
                        Question 1
                    </h2>
                    <div className="p-3 rounded-md border bg-white">
                        <p>
                            {descriptionText}
                        </p>
                    </div>
                </section>
                <section className="mx-5 my-2">
                    <h2 className="section-small-title">
                        Question 2
                    </h2>
                    <div className="p-3 rounded-md border bg-white">
                        <p>
                            {descriptionText}
                        </p>
                    </div>
                </section>
                <section className="mx-5 my-2">
                    <h2 className="section-small-title">
                        Question 3
                    </h2>
                    <div className="p-3 rounded-md border bg-white">
                        <p>
                            {descriptionText}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}