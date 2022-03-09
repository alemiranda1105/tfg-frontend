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

        expect(screen.getByText(/Perfil/)).toBeInTheDocument();
        expect(screen.getByText(/Mis métodos/)).toBeInTheDocument();
        expect(screen.getAllByText(/Cargando/)).toHaveLength(2);

        expect(await screen.findByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(await screen.findByText(mockedLoggedUser.username)).toBeInTheDocument();
        expect(await screen.findByText(/Correo/)).toBeInTheDocument();
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

        expect(screen.getByText(/Perfil/)).toBeInTheDocument();
        expect(screen.getByText(/Mis métodos/)).toBeInTheDocument();
        expect(screen.getAllByText(/Cargando/)).toHaveLength(2);

        expect(await screen.findByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(await screen.findByText(mockedLoggedUser.username)).toBeInTheDocument();
        expect(await screen.findByText(/Correo/)).toBeInTheDocument();
        expect(await screen.findByText(mockedLoggedUser.email)).toBeInTheDocument();

        expect(await screen.findByText(/Este usuario no ha subido/)).toBeInTheDocument();
    });


    test("Error fetching data", async () => {
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

        expect(screen.getByText(/Perfil/)).toBeInTheDocument();
        expect(screen.getByText(/Mis métodos/)).toBeInTheDocument();
        expect(screen.getAllByText(/Cargando/)).toHaveLength(2);

        expect(await screen.findAllByText(/Ha ocurrido un error/)).toHaveLength(2);
    });
})