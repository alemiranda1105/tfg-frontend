import { fireEvent, render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { mockedLoggedUser } from "./__mocks__/MockedData";


jest.mock('axios');

describe("Login form tests", () => {
    test("Test form validation", async () => {
        render(
            <LoginPage />
        );
        expect(screen.getByText(/Iniciar sesión/)).toBeInTheDocument();
        expect(screen.getByText(/Completar registro/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre de usuario/)).toBeInTheDocument();
            
        await act(async () => {
            fireEvent.submit(screen.getByText(/Completar registro/))
            // Validation
            expect(await screen.findByText(/Introduzca un nombre de usuario/)).toBeInTheDocument();
            expect(await screen.findByText(/Introduzca una contraseña/)).toBeInTheDocument();
        });
        
    })
    
    test("User logged correctly", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedLoggedUser,
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };

        mockedAxios.post.mockResolvedValueOnce(mockedResponse);
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        // Before login
        expect(screen.getByText(/Iniciar sesión/)).toBeInTheDocument();
        expect(screen.getByText(/Completar registro/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre de usuario:'}), {
            target: {
                value: mockedLoggedUser.username
            }
        });
        fireEvent.input(screen.getByLabelText(/contraseña/i), {
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
                <LoginPage />
            </BrowserRouter>
        );

        // Before login
        expect(screen.getByText(/Iniciar sesión/)).toBeInTheDocument();
        expect(screen.getByText(/Completar registro/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre de usuario/)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre de usuario:'}), {
            target: {
                value: mockedLoggedUser.username
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