import { render, screen, waitFor } from '@testing-library/react';
import { DownloadComponent } from '../components/DownloadComponent';

describe("DownloadComponent test", () => {
    test("Descarga fallida", async () => {
        render(
            <DownloadComponent url='error' fileType='error' />
        )
        expect(screen.getByText(/Su archivo se está descargando/)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/Reintentar/)).toBeInTheDocument();
        })
    });
    
    test("Descarga exitosa",async () => {
        render(
            <DownloadComponent url='dataset' fileType='application/x-zip-compressed' />
        )
        global.URL.createObjectURL = jest.fn(() => 'file');
        expect(screen.getByText(/Su archivo se está descargando/)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/Descargar/)).toBeInTheDocument();
            expect(screen.getByText(/La descarga se ha completado/)).toBeInTheDocument();
        });
    })

})