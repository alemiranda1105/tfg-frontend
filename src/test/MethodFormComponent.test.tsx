import { fireEvent, render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { BrowserRouter } from "react-router-dom";
import user from '@testing-library/user-event';
import { mockedMethodsList } from "./__mocks__/MockedData";
import { MethodFormComponent } from "../components/methods_components/MethodFormComponent";


jest.mock('axios');

describe("Method form tests", () => {
    test("Form validation without file", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        render(
            <BrowserRouter>
                <MethodFormComponent methodId={""} withFile={false} action={""} actionUrl={""} withMethod={true} />
            </BrowserRouter>
        );
        expect(await screen.findByText(/Name/)).toBeInTheDocument();
        expect(await screen.findByText(/Information/)).toBeInTheDocument();
        expect(await screen.findByText(/Link/)).toBeInTheDocument();
            
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

        fireEvent.submit(screen.getByText(/Upload method/));
        
        // Validation
        expect(await screen.findByText(/The text is to short, must be longer than 3 characters/)).toBeInTheDocument();
        expect(await screen.findByText(/The text is to short, must be longer than 5 characters/)).toBeInTheDocument();
        expect(await screen.findByText(/Check the data and try again/)).toBeInTheDocument();
    });

    test("Form validation with file", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        render(
            <BrowserRouter>
                <MethodFormComponent methodId={""} withFile={true} action={""} actionUrl={""} withMethod={true} />
            </BrowserRouter>
        );
        expect(await screen.findByText(/Name/)).toBeInTheDocument();
        expect(await screen.findByText(/Information/)).toBeInTheDocument();
        expect(await screen.findByText(/Link/)).toBeInTheDocument();
        expect(await screen.findByText(/Files/)).toBeInTheDocument();
            
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

        fireEvent.submit(screen.getByText(/Upload method/));
        
        // Validation
        expect(await screen.findByText(/The text is to short, must be longer than 3 characters/)).toBeInTheDocument();
        expect(await screen.findByText(/The text is to short, must be longer than 5 characters/)).toBeInTheDocument();
        expect(await screen.findByText(/Check the data and try again/)).toBeInTheDocument();
    });
    
    test("Form action executed correctly", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        mockedAxios.put.mockResolvedValueOnce(mockedResponse);

        render(
            <BrowserRouter>
                <MethodFormComponent methodId={"1"} withFile={false} action={"put"} actionUrl={"put"} withMethod={true} />
            </BrowserRouter>
        );

        // Before upload
        expect(await screen.findByText(/Name/)).toBeInTheDocument();
        expect(await screen.findByText(/Information/)).toBeInTheDocument();
        expect(await screen.findByText(/Link/)).toBeInTheDocument();
        
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
                value: "www.test.com"
            }
        });
        

        fireEvent.submit(screen.getByText(/Upload method/));
        
        expect(await screen.findByText(/Updated successfully/)).toBeInTheDocument();
    });

    test("Form action with file executed correctly", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedResponse: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        mockedAxios.put.mockResolvedValueOnce(mockedResponse);

        render(
            <BrowserRouter>
                <MethodFormComponent methodId={"1"} withFile={true} action={"put"} actionUrl={"put"} withMethod={true} />
            </BrowserRouter>
        );

        // Before upload
        expect( await screen.findByText(/Name/)).toBeInTheDocument();
        expect( await screen.findByText(/Information/)).toBeInTheDocument();
        expect( await screen.findByText(/Link/)).toBeInTheDocument();
        expect( await screen.findByText(/File/)).toBeInTheDocument();

        // File
        const content = JSON.stringify(mockedMethodsList);
        const blob = new Blob([content]);
        const file = new File([blob], 'file.zip', {
            type: "application/zip",
        });

        // Fill form
        File.prototype.text = jest.fn().mockResolvedValueOnce(content);
        const input = screen.getByLabelText(/File/);
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
                value: "www.test.com"
            }
        });

        fireEvent.submit(screen.getByText(/Upload method/));
        expect(await screen.findByText(/successfully/)).toBeInTheDocument();
    });

    test("Method form error", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedLoad: AxiosResponse = {
            data: mockedMethodsList[0],
            status: 200,
            headers: {},
            config: {},
            statusText: 'OK'
        };
        const mockedResponse = {
            response: {detail: "No se ha podido crear el método"},
            status: 500,
            statusText: 'Internal server error'
        };
        mockedAxios.get.mockResolvedValueOnce(mockedLoad);
        mockedAxios.put.mockRejectedValueOnce(mockedResponse);

        render(
            <BrowserRouter>
                <MethodFormComponent methodId={"1"} withFile={true} action={"put"} actionUrl={"put"} withMethod={true} />
            </BrowserRouter>
        );

        // Before upload
        expect( await screen.findByText(/Name/)).toBeInTheDocument();
        expect( await screen.findByText(/Information/)).toBeInTheDocument();
        expect( await screen.findByText(/Link/)).toBeInTheDocument();
        expect( await screen.findByText(/File/)).toBeInTheDocument();

        // File
        const content = JSON.stringify(mockedMethodsList);
        const blob = new Blob([content]);
        const file = new File([blob], 'file.zip', {
            type: "application/zip",
        });

        // Fill form
        File.prototype.text = jest.fn().mockResolvedValueOnce(content);
        const input = screen.getByLabelText(/File/);
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
                value: "www.test.com"
            }
        });

        fireEvent.submit(screen.getByText(/Upload method/));
        expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
    });
});