import { characteristicsText, datasetText, descriptionText } from "../mock/MockedTextPresentation"

export const PresentationPage = () => {
    return (
        <div>
            <div>
                <h2>Descripción</h2>
                <p>
                    {descriptionText}
                </p>
                <h2>Características</h2>
                <p>
                    {characteristicsText}
                </p>
                <h2>Acerca de nuestro dataset</h2>
                <p>
                    {datasetText}
                </p>
            </div>
        </div>
    )
};
