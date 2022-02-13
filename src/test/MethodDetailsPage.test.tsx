import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MethodDetailsPage } from '../pages/MethodDetailsPage';

describe("Method details page tests", () => {
    test("Obtained data", async () => {
        render(
            <MemoryRouter initialEntries={["/method_details/620559b9499d9325999e0723"]}>
                <Routes>
                    <Route path="/method_details/:methodId" element={<MethodDetailsPage />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText(/Detalles/)).toBeInTheDocument();
        expect(screen.getByText(/Cargando/)).toBeInTheDocument();
        expect(await screen.findByText(/Nombre/)).toBeInTheDocument();
        expect(await screen.findByText(/Autor/)).toBeInTheDocument();
        expect(await screen.findByText(/test/)).toBeInTheDocument();
        expect(await screen.findByText(/test_postman/)).toBeInTheDocument();
    });

    test("An error happens", async () => {
        render(
            <MemoryRouter>
                <MethodDetailsPage />
            </MemoryRouter>
        );
        expect(screen.getByText(/Detalles/)).toBeInTheDocument();
        expect(screen.getByText(/Cargando/)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Error/)).toBeInTheDocument();
        })

    });
})