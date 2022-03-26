import { fireEvent, render, screen } from "@testing-library/react";
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
        expect(screen.getByText(/Sign up/)).toBeInTheDocument();
        expect(screen.getByText(/Complete registration/)).toBeInTheDocument();
        expect(screen.getByText(/Username/)).toBeInTheDocument();
            
        await act(async () => {
            // Fill form
            fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
                target: {
                    value: "no"
                }
            });
            fireEvent.input(screen.getByRole("textbox", {name: 'Email:'}), {
                target: {
                    value: "error"
                }
            });
            fireEvent.input(screen.getByLabelText(/Password/), {
                target: {
                    value: "test"
                }
            });

            fireEvent.submit(screen.getByText(/Complete registration/))
            // Validation
            expect(await screen.findAllByText(/Write a valid/)).toHaveLength(2);
            expect(await screen.findByText(/The password is too short/)).toBeInTheDocument();
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
        expect(screen.getByText(/Sign up/)).toBeInTheDocument();
        expect(screen.getByText(/Complete registration/)).toBeInTheDocument();
        expect(screen.getByText(/Username/)).toBeInTheDocument();
        expect(screen.getByText(/Password/)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
            target: {
                value: mockedLoggedUser.username
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Email:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });
        fireEvent.input(screen.getByLabelText(/Password/), {
            target: {
                value: "test123456"
            }
        });

        fireEvent.submit(screen.getByText(/Complete registration/));
        expect(await screen.findByText(/Welcome/)).toBeInTheDocument();

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
        expect(screen.getByText(/Sign up/)).toBeInTheDocument();
        expect(screen.getByText(/Complete registration/)).toBeInTheDocument();
        expect(screen.getByText(/Username/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Username:'}), {
            target: {
                value: mockedLoggedUser.username
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Email:'}), {
            target: {
                value: mockedLoggedUser.email
            }
        });
        fireEvent.input(screen.getByLabelText(/Password/i), {
            target: {
                value: "test123456"
            }
        });

        fireEvent.submit(screen.getByText(/Complete registration/));
        expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
    });
});