import { render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MethodDetailsPage } from '../pages/MethodDetailsPage';
import { mockedMethodsList, mockedUserData } from './__mock__/MockedData';


jest.mock('axios');

describe("Method details page tests", () => {
    test("Obtained data", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        const userMockedResponse: AxiosResponse = {
            data: mockedUserData,
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        mockedAxios.get.mockImplementation(url => {
            switch (url) {
                case `${process.env.REACT_APP_API_URL}/users/${mockedMethodsList[0].user_id}`:
                    return Promise.resolve(userMockedResponse);
                case `${process.env.REACT_APP_API_URL}/methods/${mockedMethodsList[0].id}`:
                    return Promise.resolve(mockedResponse)
                default:
                    return Promise.reject(new Error("Axios error"))
            }
        })

        render(
            <MemoryRouter initialEntries={[`/method_details/${mockedMethodsList[0].id}`]}>
                <Routes>
                    <Route path="/method_details/:methodId" element={<MethodDetailsPage />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText(/Detalles/)).toBeInTheDocument();
        expect(screen.getByText(/Cargando/)).toBeInTheDocument();
        expect(await screen.findByText(/Nombre/)).toBeInTheDocument();
        expect(await screen.findByText(/Descripción/)).toBeInTheDocument();
        expect(await screen.findByText(/Autor/)).toBeInTheDocument();
        expect(await screen.findByText(/test_user/)).toBeInTheDocument();
    });

    test("An error happens", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockRejectedValueOnce(new Error("Test error"));

        render(
            <MemoryRouter>
                <MethodDetailsPage />
            </MemoryRouter>
        );
        expect(screen.getByText(/Detalles/)).toBeInTheDocument();
        expect(screen.getByText(/Cargando/)).toBeInTheDocument();

        expect(await screen.findByText(/Error/)).toBeInTheDocument();
        expect(await screen.findByText(/Algo ha ido mal/)).toBeInTheDocument();

    });
})