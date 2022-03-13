import { fireEvent, render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import { AuthContext } from '../auth/AuthContextProvider';
import { DeleteUserComponent } from '../components/user_components/DeleteUserComponent';
import { mockedLoggedUser } from './__mocks__/MockedData';


jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => {}
}))

describe("Delete user component tests", () => {
    test("User removed", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const deleteMockedResponse: AxiosResponse = {
            data: {"result": "true"},
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        mockedAxios.delete.mockResolvedValueOnce(deleteMockedResponse);

        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", setId: () => {}, setUsername: () => {}, setToken: () => {}}}>
                <MemoryRouter>
                    <DeleteUserComponent handleShow={(state: boolean) => {} } />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(/Atención/)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/Confirmar/), {
            target: {
                checked: true
            }
        });
        expect(screen.getByText(/Borrar todos los datos/)).toBeInTheDocument();
        act(() => {
            screen.getByText(/Borrar todos los datos/).dispatchEvent(new MouseEvent('click'));
        });
        expect(mockedAxios.delete).toBeCalledTimes(1);
    });

    test("Request failed", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.delete.mockRejectedValueOnce(new Error("Test"));

        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", setId: () => {}, setUsername: () => {}, setToken: () => {}}}>
                <MemoryRouter>
                    <DeleteUserComponent handleShow={(state: boolean) => {} } />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(/Atención/)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/Confirmar/), {
            target: {
                checked: true
            }
        });
        expect(screen.getByText(/Borrar todos los datos/)).toBeInTheDocument();
        act(() => {
            screen.getByText(/Borrar todos los datos/).dispatchEvent(new MouseEvent('click'));
        });
        expect(await screen.findByText(/Algo ha ido mal/)).toBeInTheDocument();
    });
})