import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MethodDetailsPage } from '../pages/MethodDetailsPage';

describe("Method details page tests", () => {
    test("Obtained data", async () => {
        render(
            <MemoryRouter initialEntries={["/method_details/61fe5434e89a1e36ef948eaa"]}>
                <Routes>
                    <Route path="/method_details/:methodId" element={<MethodDetailsPage />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText(/Detalles/)).toBeInTheDocument();
        expect(screen.getByText(/Cargando/)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Nombre/)).toBeInTheDocument();
            expect(screen.getByText(/test_postman150/)).toBeInTheDocument();
            expect(screen.getByText(/test_postman/)).toBeInTheDocument();
        });

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