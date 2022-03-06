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
        expect(await screen.findByText(/Nombre/)).toBeInTheDocument();
        expect(await screen.findByText(/Información/)).toBeInTheDocument();
        expect(await screen.findByText(/Enlace/)).toBeInTheDocument();
            
        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre:'}), {
            target: {
                value: "e"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Información:'}), {
            target: {
                value: "rr"
            }
        });

        fireEvent.submit(screen.getByText(/Subir método/));
        
        // Validation
        expect(await screen.findByText(/El texto es demasiado corto, debe tener más de 3/)).toBeInTheDocument();
        expect(await screen.findByText(/El texto es demasiado corto, debe tener más de 5/)).toBeInTheDocument();
        expect(await screen.findByText(/Revise todos los campos/)).toBeInTheDocument();
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
        expect(await screen.findByText(/Nombre/)).toBeInTheDocument();
        expect(await screen.findByText(/Información/)).toBeInTheDocument();
        expect(await screen.findByText(/Enlace/)).toBeInTheDocument();
        expect(await screen.findByText(/Fichero/)).toBeInTheDocument();
            
        // Fill form
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre:'}), {
            target: {
                value: "e"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Información:'}), {
            target: {
                value: "rr"
            }
        });

        fireEvent.submit(screen.getByText(/Subir método/));
        
        // Validation
        expect(await screen.findByText(/El texto es demasiado corto, debe tener más de 3/)).toBeInTheDocument();
        expect(await screen.findByText(/El texto es demasiado corto, debe tener más de 5/)).toBeInTheDocument();
        expect(await screen.findByText(/Revise todos los campos/)).toBeInTheDocument();
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
        expect(await screen.findByText(/Nombre/)).toBeInTheDocument();
        expect(await screen.findByText(/Información/)).toBeInTheDocument();
        expect(await screen.findByText(/Enlace/)).toBeInTheDocument();
        
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre:'}), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Información:'}), {
            target: {
                value: "This is a test example"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Enlace a la publicación:'}), {
            target: {
                value: "www.test.com"
            }
        });
        

        fireEvent.submit(screen.getByText(/Subir método/));
        
        expect(await screen.findByText(/Método subido con éxito/)).toBeInTheDocument();
        expect(await screen.findByText(/Ver método y resultados/)).toBeInTheDocument();
        
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
        expect( await screen.findByText(/Nombre/)).toBeInTheDocument();
        expect( await screen.findByText(/Información/)).toBeInTheDocument();
        expect( await screen.findByText(/Enlace/)).toBeInTheDocument();
        expect( await screen.findByText(/Fichero/)).toBeInTheDocument();

        // File
        const content = JSON.stringify(mockedMethodsList);
        const blob = new Blob([content]);
        const file = new File([blob], 'file.zip', {
            type: "application/zip",
        });

        // Fill form
        File.prototype.text = jest.fn().mockResolvedValueOnce(content);
        const input = screen.getByLabelText(/Fichero/);
        user.upload(input, file);
        
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre:'}), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Información:'}), {
            target: {
                value: "This is a test example"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Enlace a la publicación:'}), {
            target: {
                value: "www.test.com"
            }
        });

        fireEvent.submit(screen.getByText(/Subir método/));
        expect(await screen.findByText(/éxito/)).toBeInTheDocument();
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
        expect( await screen.findByText(/Nombre/)).toBeInTheDocument();
        expect( await screen.findByText(/Información/)).toBeInTheDocument();
        expect( await screen.findByText(/Enlace/)).toBeInTheDocument();
        expect( await screen.findByText(/Fichero/)).toBeInTheDocument();

        // File
        const content = JSON.stringify(mockedMethodsList);
        const blob = new Blob([content]);
        const file = new File([blob], 'file.zip', {
            type: "application/zip",
        });

        // Fill form
        File.prototype.text = jest.fn().mockResolvedValueOnce(content);
        const input = screen.getByLabelText(/Fichero/);
        user.upload(input, file);
        
        fireEvent.input(screen.getByRole("textbox", {name: 'Nombre:'}), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Información:'}), {
            target: {
                value: "This is a test example"
            }
        });
        fireEvent.input(screen.getByRole("textbox", {name: 'Enlace a la publicación:'}), {
            target: {
                value: "www.test.com"
            }
        });

        fireEvent.submit(screen.getByText(/Subir método/));
        expect(await screen.findByText(/Algo ha ido mal/)).toBeInTheDocument();
    });
});