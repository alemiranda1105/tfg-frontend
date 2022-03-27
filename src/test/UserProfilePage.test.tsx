import { render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContextProvider';
import { UserProfilePage } from '../pages/UserProfilePage';
import { mockedLoggedUser, mockedMethodsList } from './__mocks__/MockedData';

jest.mock('axios');

describe("User profile page tests", () => {
    test("Obtained data from user", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList,
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        const userMockedResponse: AxiosResponse = {
            data: mockedLoggedUser,
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        mockedAxios.get.mockImplementation(url => {
            switch (url) {
                case `${process.env.REACT_APP_API_URL}/users/profile?user_id=${mockedLoggedUser.id}`:
                    return Promise.resolve(userMockedResponse);
                case `${process.env.REACT_APP_API_URL}/methods/user_methods?user_id=`:
                    return Promise.resolve(mockedResponse);
                default:
                    return Promise.reject(new Error("Axios error"))
            }
        })

        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", setId: () => {}, setUsername: () => {}, setToken: () => {}}}>
                <MemoryRouter>
                    <UserProfilePage />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText(/Profile/)).toBeInTheDocument();
        expect(screen.getByText(/My methods/)).toBeInTheDocument();
        expect(screen.getAllByText(/Loading/)).toHaveLength(2);

        expect(await screen.findByText(/Username/)).toBeInTheDocument();
        expect(await screen.findByText(mockedLoggedUser.username)).toBeInTheDocument();
        expect(await screen.findByText(/Email/)).toBeInTheDocument();
        expect(await screen.findByText(mockedLoggedUser.email)).toBeInTheDocument();

        expect(await screen.findByText(mockedMethodsList[0].name)).toBeInTheDocument();
    });

    test("Obtained data from user but not from methods", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: [],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        const userMockedResponse: AxiosResponse = {
            data: mockedLoggedUser,
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        mockedAxios.get.mockImplementation(url => {
            switch (url) {
                case `${process.env.REACT_APP_API_URL}/users/profile?user_id=${mockedLoggedUser.id}`:
                    return Promise.resolve(userMockedResponse);
                case `${process.env.REACT_APP_API_URL}/methods/user_methods?user_id=`:
                    return Promise.resolve(mockedResponse);
                default:
                    return Promise.reject(new Error("Axios error"))
            }
        })

        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", setId: () => {}, setUsername: () => {}, setToken: () => {}}}>
                <MemoryRouter>
                    <UserProfilePage />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText(/Profile/)).toBeInTheDocument();
        expect(screen.getByText(/My methods/)).toBeInTheDocument();
        expect(screen.getAllByText(/Loading/)).toHaveLength(2);

        expect(await screen.findByText(/Username/)).toBeInTheDocument();
        expect(await screen.findByText(mockedLoggedUser.username)).toBeInTheDocument();
        expect(await screen.findByText(/Email/)).toBeInTheDocument();
        expect(await screen.findByText(mockedLoggedUser.email)).toBeInTheDocument();

        expect(await screen.findByText(/This user has not upload any method yet/)).toBeInTheDocument();
    });


    test("Error fetching data", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockImplementation(url => {
            switch (url) {
                case `${process.env.REACT_APP_API_URL}/users/profile?user_id=${mockedLoggedUser.id}`:
                    return Promise.reject(new Error("Axios error"));
                case `${process.env.REACT_APP_API_URL}/methods/user_methods?user_id=`:
                    return Promise.reject(new Error("Axios error"));
                default:
                    return Promise.reject(new Error("Axios error"))
            }
        })

        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", setId: () => {}, setUsername: () => {}, setToken: () => {}}}>
                <MemoryRouter>
                    <UserProfilePage />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText(/Profile/)).toBeInTheDocument();
        expect(screen.getByText(/My methods/)).toBeInTheDocument();
        expect(screen.getAllByText(/Loading/)).toHaveLength(2);

        expect(await screen.findAllByText(/Something went wrong/)).toHaveLength(4);
    });
})