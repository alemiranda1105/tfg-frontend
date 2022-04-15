import { render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { ResultDetailsComponent } from '../components/methods_components/ResultsDetailsComponent';
import { mockedMethodsList } from './__mocks__/MockedData';

jest.mock('axios');

describe("Results details component tests", () => {

    test("Results are loaded", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);

        render(
            <MemoryRouter>
                <ResultDetailsComponent methodId={'1'} details={"TEMPLATE"} />
            </MemoryRouter>
        )

        // Before fetching
        expect(screen.getByText(/Loading.../)).toBeInTheDocument();

        // After fetching
        expect(await screen.findByText(/f1_score/)).toBeInTheDocument();
        expect(await screen.findByText(/recall_score/)).toBeInTheDocument();
        expect(await screen.findByText(/precision_score/)).toBeInTheDocument();
        expect(await screen.findAllByText(mockedMethodsList[0].results_by_category[1]['f1_score'])).toHaveLength(3);
    });

    test("Results by field",async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        render(
            <MemoryRouter>
                <ResultDetailsComponent methodId={'1'} details={"FIELD"} />
            </MemoryRouter>
        )

        // Before fetching
        expect(screen.getByText(/Loading.../)).toBeInTheDocument();

        // After fetching
        expect(await screen.findAllByText(/f1_score/)).toHaveLength(mockedMethodsList[0].results_by_field.length);
        expect(await screen.findAllByText(/precision_score/)).toHaveLength(mockedMethodsList[0].results_by_field.length);
        expect(await screen.findAllByText(/recall_score/)).toHaveLength(mockedMethodsList[0].results_by_field.length);
    });

    test("Results are not loaded", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockRejectedValueOnce(new Error("Test error"));

        render(
            <ResultDetailsComponent methodId={'1'} details={"TEMPLATE"} />
        )
        // Before fetching
        expect(screen.getByText(/Loading.../)).toBeInTheDocument();
        
        //After fetching
        expect(await screen.findAllByText(/Something went wrong/)).toHaveLength(2);
    });
})

