import { fireEvent, render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { BrowserRouter } from "react-router-dom";
import { UploadMethodPage } from "../pages/UploadMethodPage";
import user from '@testing-library/user-event';
import { mockedLoggedUser, mockedMethodsList } from "./__mocks__/MockedData";
import { AuthContext } from "../auth/AuthContextProvider";


jest.mock('axios');

describe("Submit results form tests", () => {
    test("Form validation", async () => {
        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", role: "user", setId: () => {}, setUsername: () => {}, setToken: () => {}, setRole: () => {}}}>
                <BrowserRouter>
                    <UploadMethodPage />
                </BrowserRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(/Upload new method/)).toBeInTheDocument();
        expect(screen.getByText(/Name/)).toBeInTheDocument();
        expect(screen.getByText(/Information/)).toBeInTheDocument();
        expect(screen.getByText(/Link/)).toBeInTheDocument();
        expect(screen.getByText(/Files/)).toBeInTheDocument();
            
        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Name:'}), {
            target: {
                value: "e"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Information:'}), {
            target: {
                value: "rr"
            }
        });

        fireEvent.submit(screen.getByText(/Submit results/));
        
        // Validation
        expect(await screen.findAllByText(/The text is to short/)).toHaveLength(2);
        expect(await screen.findByText(/Check the data and try again/)).toBeInTheDocument();
    })
    
    test("Method created correctly", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 201,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        
        mockedAxios.post.mockResolvedValueOnce(mockedResponse);

        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", role: "user", setId: () => {}, setUsername: () => {}, setToken: () => {}, setRole: () => {}}}>
                <BrowserRouter>
                    <UploadMethodPage />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Before upload
        expect(screen.getByText(/Upload new method/)).toBeInTheDocument();
        expect(screen.getByText(/Name/)).toBeInTheDocument();
        expect(screen.getByText(/Information/)).toBeInTheDocument();
        expect(screen.getByText(/Link/)).toBeInTheDocument();
        expect(screen.getByText(/Files/)).toBeInTheDocument();

        // File
        const content = JSON.stringify(mockedMethodsList);
        const blob = new Blob([content]);
        const file = new File([blob], 'file.zip', {
            type: "application/zip",
        });
        
        // Fill form
        File.prototype.text = jest.fn().mockResolvedValueOnce(content);
        const input = screen.getByLabelText(/Files/);
        user.upload(input, file);
        
        fireEvent.input(screen.getByRole("textbox", {name: 'Name:'}), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Information:'}), {
            target: {
                value: "This is a test example"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Link:'}), {
            target: {
                value: "https://www.test.com"
            }
        });
        

        fireEvent.submit(screen.getByText(/Submit results/));
        
        expect(await screen.findByText(/Updated successfully/)).toBeInTheDocument();
    });

    test("Method cannot be created", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse = {
            response: {detail: "No se ha podido crear el método"},
            status: 500,
            statusText: 'Internal server error'
        };

        mockedAxios.post.mockRejectedValueOnce(mockedResponse);

        render(
            <AuthContext.Provider value={{user_id: mockedLoggedUser.id, username: "test", token: "1", role: "user", setId: () => {}, setUsername: () => {}, setToken: () => {}, setRole: () => {}}}>
                <BrowserRouter>
                    <UploadMethodPage />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Before upload
        expect(screen.getByText(/Upload new method/)).toBeInTheDocument();
        expect(screen.getByText(/Name/)).toBeInTheDocument();
        expect(screen.getByText(/Information/)).toBeInTheDocument();
        expect(screen.getByText(/Link/)).toBeInTheDocument();
        expect(screen.getByText(/Files/)).toBeInTheDocument();

        // File
        const content = JSON.stringify(mockedMethodsList);
        const blob = new Blob([content]);
        const file = new File([blob], 'file.zip', {
            type: "application/zip",
        });

        // Fill form
        File.prototype.text = jest.fn().mockResolvedValueOnce(content);
        const input = screen.getByLabelText(/Files/);
        user.upload(input, file);
        
        fireEvent.input(screen.getByRole("textbox", {name: 'Name:'}), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Information:'}), {
            target: {
                value: "This is a test example"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Link:'}), {
            target: {
                value: "https://www.test.com"
            }
        });

        fireEvent.submit(screen.getByText(/Submit results/));
        expect(await screen.findByText(/wrong/)).toBeInTheDocument();
    });

    test("User is not logged", () => {
        render(
            <BrowserRouter>
                <UploadMethodPage />
            </BrowserRouter>
        );
        expect(screen.getAllByText(/Login/)).toHaveLength(1);
        expect(screen.getByText(/Email or/)).toBeInTheDocument();
    });
});