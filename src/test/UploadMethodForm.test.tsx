import { fireEvent, render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { BrowserRouter } from "react-router-dom";
import { UploadMethodPage } from "../pages/UploadMethodPage";
import user from '@testing-library/user-event';
import { mockedMethodsList } from "./__mocks__/MockedData";


jest.mock('axios');

describe("Upload method form tests", () => {
    test("Form validation", async () => {
        render(
            <BrowserRouter>
                <UploadMethodPage />
            </BrowserRouter>
        );
        expect(screen.getByText(/Subir nuevo/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre/)).toBeInTheDocument();
        expect(screen.getByText(/Información/)).toBeInTheDocument();
        expect(screen.getByText(/Enlace/)).toBeInTheDocument();
        expect(screen.getByText(/Fichero/)).toBeInTheDocument();
            
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
            <BrowserRouter>
                <UploadMethodPage />
            </BrowserRouter>
        );

        // Before upload
        expect(screen.getByText(/Subir nuevo/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre/)).toBeInTheDocument();
        expect(screen.getByText(/Información/)).toBeInTheDocument();
        expect(screen.getByText(/Enlace/)).toBeInTheDocument();
        expect(screen.getByText(/Fichero/)).toBeInTheDocument();

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
        
        expect(await screen.findByText(/Método subido con éxito/)).toBeInTheDocument();
        expect(await screen.findByText(/Ver método y resultados/)).toBeInTheDocument();
        
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
            <BrowserRouter>
                <UploadMethodPage />
            </BrowserRouter>
        );

        // Before upload
        expect(screen.getByText(/Subir nuevo/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre/)).toBeInTheDocument();
        expect(screen.getByText(/Información/)).toBeInTheDocument();
        expect(screen.getByText(/Enlace/)).toBeInTheDocument();
        expect(screen.getByText(/Fichero/)).toBeInTheDocument();

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