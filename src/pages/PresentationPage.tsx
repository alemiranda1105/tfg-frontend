import { DownloadButton } from "../components/download_components/DownloadButton";
import { characteristicsText, datasetText, descriptionText } from "../mock/MockedTextPresentation"
import facturasImg from '../res/facturas-luz.png';

export const PresentationPage = () => {
    return (
        <div className="flex flex-col justify-between">
            <div>
                <section className="m-5">
                    <div className="flex flex-col p-4 rounded-md border bg-white">
                        <h2 className="text-2xl font-bold tracking-wide text-black underline underline-2 decoration-blue-700">
                            Descargar dataset
                        </h2>
                        <h4 className="text-lg font-medium">
                            Descarga nuestro dataset para poder comparar tus resultados con otros investigadores o incluirlos en artículos
                        </h4>
                        <div className="self-center">
                            <DownloadButton text={"Descargar"} url={"dataset"} fileType={"application/x-zip-compressed"} />
                        </div>
                    </div>
                </section>
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
                <section className="m-5">
                    <h2 className="text-2xl font-bold tracking-wide leading-10 text-blue-700">
                        Características
                    </h2>
                    <div className="p-3 rounded-md border bg-white">
                        <p>
                            {characteristicsText}
                        </p>
                    </div>
                </section>
                <section className="m-5">
                    <h2 className="text-2xl font-bold tracking-wide leading-10 text-blue-700">
                        Acerca de nuestro dataset
                    </h2>
                    <div className="md:flex p-3 rounded-md border overflow-hidden bg-white">
                        <div className="md:shrink-0">
                            <img src={facturasImg} alt="Imagen de facturas" className="h-48 w-full object-cover md:h-full md:w-48"/>
                        </div>
                        <div className="p-8">
                            <p>
                                {datasetText}
                            </p>
                            <h4 className="text-m font-m leading-9 font-semibold">Contenido del dataset</h4>
                            <ul className="list-disc list-inside">
                                <li>9 Templates</li>
                                <li>5000 facturas para cada template</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="m-5">
                    <h2 className="text-2xl font-bold tracking-wide leading-10 text-blue-700">
                        Acerca de nuestra base de datos
                    </h2>
                    <div className="p-3 rounded-md border bg-white">
                        <p>
                            {datasetText}
                        </p>
                        <h3 className="text-xl font-semibold tracking-wide leading-10">¿Cómo se organiza?</h3>
                        <ul className="list-disc list-inside">
                            <li>Nombre</li>
                            <li>Descripción</li>
                            <li>Link a la publicación</li>
                            <h4 className="text-m font-m leading-9 font-semibold">Ejemplo de documento en la base de datos:</h4>
                            <p className="text-m font-light">
                                {`{
                                    "id": "1",
                                    "user_id": "1",
                                    "name": "example",
                                    "info": "This is an example",
                                    "link": "example.com",
                                    "results": [
                                        {
                                            "score_1": 0.5912
                                        },
                                        {
                                            "score_2": 0.8745
                                        },
                                        {
                                            "score_3": 0.4478
                                        }
                                    ]
                                }`}
                            </p>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
};
