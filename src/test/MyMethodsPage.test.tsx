import { render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../auth/AuthContextProvider";
import { MyMethodsPage } from "../pages/MyMethodsPage";
import { mockedMethodsList } from "./__mocks__/MockedData";

jest.mock('axios');
describe("MyMethodsPage tests", () => {
    
    test("Methods loaded correctly", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: [mockedMethodsList[0]],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };

        mockedAxios.get.mockResolvedValue(mockedResponse);
        
        render(
            <AuthContext.Provider value={{user_id: "1", username: "test", token: "1", role: "user", setId: () => {}, setUsername: () => {}, setToken: () => {}, setRole: () => {}}}>
                <BrowserRouter>
                    <MyMethodsPage />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Before fetching
        expect(screen.getByText(/My methods/)).toBeInTheDocument();

        // After fetching
        expect(await screen.findByText(/test/)).toBeInTheDocument();
        expect(await screen.findAllByText(/example/)).toHaveLength(2);

    });

    test("Methods are not loaded", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockRejectedValueOnce(new Error("Test error"));
        
        render(
            <AuthContext.Provider  value={{user_id: "1", username: "test", token: "1", role: "user", setId: () => {}, setUsername: () => {}, setToken: () => {}, setRole: () => {}}}>
                <BrowserRouter>
                    <MyMethodsPage />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Before fetching
        expect(screen.getByText(/My methods/)).toBeInTheDocument();

        // After fetching
        expect(await screen.findAllByText(/Something went wrong/)).toHaveLength(2);
    });
    
    test("The user has not methods", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: [],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };

        mockedAxios.get.mockResolvedValue(mockedResponse);
        
        render(
            <AuthContext.Provider value={{user_id: "1", username: "test", token: "1", role: "user", setId: () => {}, setUsername: () => {}, setToken: () => {}, setRole: () => {}}}>
                <BrowserRouter>
                    <MyMethodsPage />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Before fetching
        expect(screen.getByText(/My methods/)).toBeInTheDocument();

        // After fetching
        expect(await screen.findByText(/An error/)).toBeInTheDocument();
        expect(await screen.findByText(/This user has not upload any method yet/)).toBeInTheDocument();
    });

});