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
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
        expect(screen.getAllByText(/Login/)).toHaveLength(2);
        expect(screen.getAllByText(/Username/)).toHaveLength(2);
        await act(async () => {
            // Fill form
            fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
                target: {
                    value: "no"
                }
            });
            fireEvent.input(screen.getByLabelText(/Password/), {
                target: {
                    value: "test"
                }
            });
            fireEvent.submit(screen.getByRole('button', {name: 'Login'}));
            // Validation
            expect(await screen.findAllByText(/Write a/)).toHaveLength(1);
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
        expect(screen.getAllByText(/Login/)).toHaveLength(2);
        expect(screen.getAllByText(/Username/)).toHaveLength(2);

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
            target: {
                value: mockedLoggedUser.username
            }
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: {
                value: "test123456"
            }
        });

        fireEvent.submit(screen.getByRole('button', {name: 'Login'}));
        expect(await screen.findByText(/Welcome/)).toBeInTheDocument();

    });

    test("User logged correctly with email", async () => {
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
        expect(screen.getAllByText(/Login/)).toHaveLength(2);
        expect(screen.getAllByText(/Username/)).toHaveLength(2);
        
        fireEvent.click(screen.getAllByText(/Email/)[0]);
        expect(await screen.findAllByText(/Email/)).toHaveLength(2);

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Email:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: {
                value: "test123456"
            }
        });

        fireEvent.submit(screen.getByRole('button', {name: 'Login'}));
        expect(await screen.findByText(/Welcome/)).toBeInTheDocument();
    });

    test("User cannot be logged", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse = {
            response: {detail: "Invalid username"},
            status: 404,
            statusText: 'Not found'
        };

        mockedAxios.post.mockRejectedValueOnce(mockedResponse);

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        // Before login
        expect(screen.getAllByText(/Login/)).toHaveLength(2);
        expect(screen.getAllByText(/Username/)).toHaveLength(2);

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
            target: {
                value: mockedLoggedUser.username
            }
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: {
                value: "test123456"
            }
        });

        fireEvent.submit(screen.getByRole('button', {name: 'Login'}));
        expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
    });
});