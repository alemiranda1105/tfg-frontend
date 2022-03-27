import { render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { ResultsPage } from '../pages/ResultsPage';
import { mockedMethodsList } from './__mocks__/MockedData';

jest.mock('axios');

describe("ResultPage tests", () => {

    test("Los resultados se cargan correctamente", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList,
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);

        render(
            <MemoryRouter>
                <ResultsPage />
            </MemoryRouter>
        )

        // Before fetching
        expect(screen.getByText(/Ranking/)).toBeInTheDocument();
        expect(screen.getByText(/Loading.../)).toBeInTheDocument();

        // After fetching
        expect(await screen.findByText(/f1_score/)).toBeInTheDocument();
        expect(await screen.findByText(/recall_score/)).toBeInTheDocument();
        expect(await screen.findByText(/precision_score/)).toBeInTheDocument();
    });

    test("Los resultados no se cargan", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockRejectedValueOnce(new Error("Test error"));

        render(
            <ResultsPage />
        )
        // Before fetching
        expect(screen.getByText(/Ranking/)).toBeInTheDocument();
        expect(screen.getByText(/Loading.../)).toBeInTheDocument();
        
        //After fetching
        expect(await screen.findAllByText(/Something went wrong/)).toHaveLength(2);
    })
})
