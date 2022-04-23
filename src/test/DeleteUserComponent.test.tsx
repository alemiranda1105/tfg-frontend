import { fireEvent, render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
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
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", role: "user", setId: () => {}, setUsername: () => {}, setToken: () => {}, setRole: () => {}}}>
                <MemoryRouter>
                    <DeleteUserComponent handleShow={(state: boolean) => {} } />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(/Attention!/)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/Confirm/), {
            target: {
                checked: true
            }
        });
        expect(screen.getByText(/DELETE everything/)).toBeInTheDocument();
        act(() => {
            screen.getByText(/DELETE everything/).dispatchEvent(new MouseEvent('click'));
        });
        expect(mockedAxios.delete).toBeCalledTimes(1);
    });

    test("Request failed", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.delete.mockRejectedValueOnce(new Error("Test"));

        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", role: "user", setId: () => {}, setUsername: () => {}, setToken: () => {}, setRole: () => {}}}>
                <MemoryRouter>
                    <DeleteUserComponent handleShow={(state: boolean) => {} } />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(/Attention/)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/Confirm/), {
            target: {
                checked: true
            }
        });
        expect(screen.getByText(/DELETE everything/)).toBeInTheDocument();
        act(() => {
            screen.getByText(/DELETE everything/).dispatchEvent(new MouseEvent('click'));
        });
        expect(await screen.findByText(/wrong/i)).toBeInTheDocument();
    });
})