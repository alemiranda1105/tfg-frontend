import { render, screen, waitFor } from '@testing-library/react';
import { ResultsPage } from '../pages/ResultsPage';

describe("ResultPage tests", () => {

    test("Los resultados se cargan correctamente", async () => {
        render(
            <ResultsPage />
        )
        expect(screen.getByText(/Resultados y ranking/)).toBeInTheDocument();
        expect(screen.getByText(/Cargando.../)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/f1_score/)).toBeInTheDocument();
            expect(screen.getByText(/recall_score/)).toBeInTheDocument();
            expect(screen.getByText(/precision_score/)).toBeInTheDocument();
        });
    });

    test("Los resultados no se cargan", async () => {
        // Rejected fetch
        let originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.reject()
        })) as any;

        render(
            <ResultsPage />
        )

        expect(screen.getByText(/Resultados y ranking/)).toBeInTheDocument();
        expect(screen.getByText(/Cargando.../)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Ha ocurrido un error/)).toBeInTheDocument();
        });

        // fecth to default value
        global.fetch = originalFetch;
    })
})
