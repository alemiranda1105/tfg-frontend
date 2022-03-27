import { render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MethodDetailsPage } from '../pages/MethodDetailsPage';
import { mockedMethodsList, mockedUserData } from './__mocks__/MockedData';


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
        expect(screen.getByText(/Details/)).toBeInTheDocument();
        expect(screen.getByText(/Loading/)).toBeInTheDocument();
        expect(await screen.findByText(/Name/)).toBeInTheDocument();
        expect(await screen.findByText(/Description/)).toBeInTheDocument();
        expect(await screen.findByText(/Author/)).toBeInTheDocument();
        expect(await screen.findByText(/test_user/)).toBeInTheDocument();
        expect(await screen.findByText(/private/i)).toBeInTheDocument();
        expect(await screen.findByText(/yes/i)).toBeInTheDocument();
    });

    test("Obtained data and method is public", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[1],
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
                case `${process.env.REACT_APP_API_URL}/users/${mockedMethodsList[1].user_id}`:
                    return Promise.resolve(userMockedResponse);
                case `${process.env.REACT_APP_API_URL}/methods/${mockedMethodsList[1].id}`:
                    return Promise.resolve(mockedResponse)
                default:
                    return Promise.reject(new Error("Axios error"))
            }
        })

        render(
            <MemoryRouter initialEntries={[`/method_details/${mockedMethodsList[1].id}`]}>
                <Routes>
                    <Route path="/method_details/:methodId" element={<MethodDetailsPage />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText(/Details/)).toBeInTheDocument();
        expect(screen.getByText(/Loading/)).toBeInTheDocument();
        expect(await screen.findByText(/Name/)).toBeInTheDocument();
        expect(await screen.findByText(/Description/)).toBeInTheDocument();
        expect(await screen.findByText(/Author/)).toBeInTheDocument();
        expect(await screen.findByText(/test_user/)).toBeInTheDocument();
        expect(await screen.findByText(/private/i)).toBeInTheDocument();
        expect(await screen.findByText("No")).toBeInTheDocument();
    });

    test("An error happens", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockRejectedValueOnce(new Error("Test error"));

        render(
            <MemoryRouter>
                <MethodDetailsPage />
            </MemoryRouter>
        );
        expect(screen.getByText(/Details/)).toBeInTheDocument();
        expect(screen.getByText(/Loading/)).toBeInTheDocument();

        expect(await screen.findByText(/Error/)).toBeInTheDocument();
        expect(await screen.findAllByText(/Something went wrong/)).toHaveLength(2);

    });
})