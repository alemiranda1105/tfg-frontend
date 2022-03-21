import { TextContainer } from "../components/custom_components/TextContainer";
import { characteristicsText, datasetText, descriptionText } from "../mock/MockedTextPresentation";

import '../styles/PresentationPage.css';

export const PresentationPage = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="flex text-center justify-center items-center w-full h-screen -mt-2 parallax">
                <h1 className="text-4xl font-extrabold text-white/70">Bienvenido a la plataforma del IDSEM</h1>
            </div>
            <div className="flex flex-col items-center">
                <div className="info-section">
                    <section className="m-5">
                        <div className="text-container">    
                            <h2 className="section-title">
                                Descripción
                            </h2>
                            <TextContainer text={descriptionText} />
                        </div>
                    </section>
                    <section className="m-5">
                        <div className="text-container">    
                            <h2 className="section-title">
                                Características
                            </h2>
                            <TextContainer text={characteristicsText} />
                        </div>
                    </section>
                    <section className="m-5">
                        <div className="text-container">
                            <h2 className="section-title">
                                Nuestro dataset
                            </h2>
                            <TextContainer text={datasetText}/>
                        </div>
                    </section>
                </div>

                <section className="m-5">
                    <h2 className="section-title">
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
