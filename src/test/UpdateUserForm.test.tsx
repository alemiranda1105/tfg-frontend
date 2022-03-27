import { fireEvent, render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../auth/AuthContextProvider";
import { UpdateUserProfilePage } from "../pages/UpdateUserProfilePage";
import { mockedLoggedUser } from "./__mocks__/MockedData";

jest.mock("axios");

describe("UpdateUserForm tests", () => {
    test("Test validation", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: {
                username: mockedLoggedUser.username,
                email: mockedLoggedUser.email
            },
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", setId: () => {}, setUsername: () => {}, setToken: () => {}}}>
                <MemoryRouter>
                    <UpdateUserProfilePage />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText(/Update user/)).toBeInTheDocument();
        expect(screen.getByText(/Update your data/)).toBeInTheDocument();

        expect(await screen.findByText(/Username/)).toBeInTheDocument();
        expect(await screen.findByText(/Email/)).toBeInTheDocument();
        expect(await screen.findByText(/Current password/)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
            target: {
                value: "e"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Email:'}), {
            target: {
                value: "rr"
            }
        });

        fireEvent.submit(screen.getByRole("button", { name: 'Update user' }));
        
        // Validation
        expect(await screen.findByText(/The text is to short/)).toBeInTheDocument();
        expect(await screen.findByText(/Invalid format/)).toBeInTheDocument();
        expect(await screen.findByText(/Check all the fields and try again/)).toBeInTheDocument();
    });

    test("User updated correctly", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: {
                username: mockedLoggedUser.username,
                email: mockedLoggedUser.email
            },
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        const mockedUpdatedResponse: AxiosResponse = {
            data: {
                username: "test_updated",
                email: mockedLoggedUser.email
            },
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        mockedAxios.put.mockResolvedValueOnce(mockedUpdatedResponse);
        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", setId: () => {}, setUsername: () => {}, setToken: () => {}}}>
                <MemoryRouter>
                    <UpdateUserProfilePage />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText(/Update user/)).toBeInTheDocument();
        expect(screen.getByText(/Update your data/)).toBeInTheDocument();

        expect(await screen.findByText(/Username/)).toBeInTheDocument();
        expect(await screen.findByText(/Email/)).toBeInTheDocument();
        expect(await screen.findByText(/password/)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
            target: {
                value: "test_updated"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Email:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });

        fireEvent.submit(screen.getByRole('button', { name: 'Update user' }));
        
        // Data updated
        expect(await screen.findByText(/Data updated/)).toBeInTheDocument();
        expect(await screen.findByText(/test_updated/)).toBeInTheDocument();
    });

    test("Error case", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: {
                username: mockedLoggedUser.username,
                email: mockedLoggedUser.email
            },
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        const mockedUpdatedResponse = {
            response: {detail: "No se ha podido crear al usuario"},
            status: 422,
            statusText: 'Unprocessable Entity'
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        mockedAxios.put.mockRejectedValueOnce(mockedUpdatedResponse);
        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", setId: () => {}, setUsername: () => {}, setToken: () => {}}}>
                <MemoryRouter>
                    <UpdateUserProfilePage />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText(/Update user/)).toBeInTheDocument();
        expect(screen.getByText(/Update your data/)).toBeInTheDocument();

        expect(await screen.findByText(/Username/)).toBeInTheDocument();
        expect(await screen.findByText(/Email/)).toBeInTheDocument();
        expect(await screen.findByText(/password/)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
            target: {
                value: "test_updated"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Email:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Email:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });

        fireEvent.submit(screen.getByRole('button', { name: 'Update user' }));
        
        // Data updated
        expect(await screen.findByText(/wrong/)).toBeInTheDocument();
    });
})