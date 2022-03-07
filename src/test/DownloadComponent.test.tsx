import { render, screen, waitFor } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { DownloadComponent } from '../components/download_components/DownloadComponent';

jest.mock('axios');
describe("DownloadComponent test", () => {

    test("Descarga fallida", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse = {
            response: {detail: "No se ha podido crear el método"},
            status: 500,
            statusText: 'Internal server error'
        };

        mockedAxios.get.mockRejectedValueOnce(mockedResponse);
        
        render(
            <DownloadComponent url='error' fileType='error' />
        )
        expect(screen.getByText(/Su archivo se está descargando/)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/Reintentar/)).toBeInTheDocument();
        })
    });
    
    test("Descarga exitosa",async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: "test",
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
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