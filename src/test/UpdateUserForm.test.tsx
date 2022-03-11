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

        expect(screen.getByText(/Editar usuario/)).toBeInTheDocument();
        expect(screen.getByText(/Edite los datos del usuario/)).toBeInTheDocument();

        expect(await screen.findByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(await screen.findByText(/Correo electrónico/)).toBeInTheDocument();
        expect(await screen.findByText(/Contraseña/)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre de usuario:'}), {
            target: {
                value: "e"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Correo electrónico:'}), {
            target: {
                value: "rr"
            }
        });

        fireEvent.submit(screen.getByText(/Actualizar/));
        
        // Validation
        expect(await screen.findByText(/El texto es demasiado corto, debe tener más de 3/)).toBeInTheDocument();
        expect(await screen.findByText(/Formato no válido/)).toBeInTheDocument();
        expect(await screen.findByText(/Revise todos los campos/)).toBeInTheDocument();
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

        expect(screen.getByText(/Editar usuario/)).toBeInTheDocument();
        expect(screen.getByText(/Edite los datos del usuario/)).toBeInTheDocument();

        expect(await screen.findByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(await screen.findByText(/Correo electrónico/)).toBeInTheDocument();
        expect(await screen.findByText(/Contraseña/)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre de usuario:'}), {
            target: {
                value: "test_updated"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Correo electrónico:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Correo electrónico:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });

        fireEvent.submit(screen.getByText(/Actualizar/));
        
        // Data updated
        expect(await screen.findByText(/Datos actualizados/)).toBeInTheDocument();
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

        expect(screen.getByText(/Editar usuario/)).toBeInTheDocument();
        expect(screen.getByText(/Edite los datos del usuario/)).toBeInTheDocument();

        expect(await screen.findByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(await screen.findByText(/Correo electrónico/)).toBeInTheDocument();
        expect(await screen.findByText(/Contraseña/)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre de usuario:'}), {
            target: {
                value: "test_updated"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Correo electrónico:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Correo electrónico:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });

        fireEvent.submit(screen.getByText(/Actualizar/));
        
        // Data updated
        expect(await screen.findByText(/Algo ha ido mal/)).toBeInTheDocument();
    });
})