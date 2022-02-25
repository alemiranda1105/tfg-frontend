import { fireEvent, getByRole, getByText, render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { SignUpPage } from "../pages/SignUpPage";
import { mockedLoggedUser } from "./__mocks__/MockedData";


jest.mock('axios');

describe("Registration form tests", () => {
    test("Test form validation", async () => {
        render(
            <BrowserRouter>
                <SignUpPage />
            </BrowserRouter>
        );
        expect(screen.getByText(/Registro/)).toBeInTheDocument();
        expect(screen.getByText(/Completar registro/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre de usuario/)).toBeInTheDocument();
            
        await act(async () => {
            // Fill form
            fireEvent.input(screen.getByRole("textbox", {name: 'Nombre de usuario:'}), {
                target: {
                    value: "no"
                }
            });
            fireEvent.input(screen.getByRole("textbox", {name: 'Correo electrónico:'}), {
                target: {
                    value: "error"
                }
            });
            fireEvent.input(screen.getByLabelText(/Contraseña/), {
                target: {
                    value: "test"
                }
            });

            fireEvent.submit(screen.getByText(/Completar registro/))
            // Validation
            expect(await screen.findByText(/Introduzca un nombre de usuario de entre 3 y 20 caracteres/)).toBeInTheDocument();
            expect(await screen.findByText(/Introduzca un email válido/)).toBeInTheDocument();
            expect(await screen.findByText(/Introduzca una contraseña más larga/)).toBeInTheDocument();
        });
        
    })
    
    test("User created correctly", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedLoggedUser,
            status: 201,
            headers: {},
            config: {},
            statusText: 'OK'
        };

        mockedAxios.post.mockResolvedValueOnce(mockedResponse);
        render(
            <BrowserRouter>
                <SignUpPage />
            </BrowserRouter>
        );

        // Before login
        expect(screen.getByText(/Registro/)).toBeInTheDocument();
        expect(screen.getByText(/Completar registro/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(screen.getByText(/Contraseña/)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre de usuario:'}), {
            target: {
                value: mockedLoggedUser.username
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Correo electrónico:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });
        fireEvent.input(screen.getByLabelText(/Contraseña/), {
            target: {
                value: "test123456"
            }
        });

        fireEvent.submit(screen.getByText(/Completar registro/));
        expect(await screen.findByText(/Bienvenido/)).toBeInTheDocument();

    });

    test("User cannot be created", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse = {
            response: {detail: "No se ha podido crear al usuario"},
            status: 422,
            statusText: 'Unprocessable Entity'
        };

        mockedAxios.post.mockRejectedValueOnce(mockedResponse);

        render(
            <BrowserRouter>
                <SignUpPage />
            </BrowserRouter>
        );

        // Before login
        expect(screen.getByText(/Registro/)).toBeInTheDocument();
        expect(screen.getByText(/Completar registro/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre de usuario:'}), {
            target: {
                value: mockedLoggedUser.username
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Correo electrónico:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });
        fireEvent.input(screen.getByLabelText(/contraseña/i), {
            target: {
                value: "test123456"
            }
        });

        fireEvent.submit(screen.getByText(/Completar registro/));
        expect(await screen.findByText(/Algo ha ido mal/)).toBeInTheDocument();
    });
});