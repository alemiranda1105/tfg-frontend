import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "react-use-cookie";

export function useDownload(url: string, fileType:string) {
    const [downloading, setDownloading] = useState(true);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        let mounted = true;
        if(url === '' || fileType === '') {
            return;
        }

        let config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            },
            responseType: 'blob'
        }

        axios.get(`${process.env.REACT_APP_API_URL}/${url}`, config)
        .then(res => res.data)
        .then(data => {
            if(mounted) {
                const downloadLink = window.URL.createObjectURL(data);
                setFile(downloadLink);
                const link = document.createElement('a');
                link.href = downloadLink;
                if(fileType === 'text/csv') {
                    link.setAttribute('download', `file.csv`);
                    setFileName('file.csv');
                } else if(fileType === 'application/json') {
                    link.setAttribute('download', `file.json`);
                    setFileName('file.json');
                } else if(fileType === 'application/vnd.ms-excel') {
                    link.setAttribute('download', `file.xlsx`);
                    setFileName('file.xlsx');
                } else if(fileType === 'application/x-zip-compressed') {
                    link.setAttribute('download', 'file.zip');
                    setFileName('file.zip');
                } else {
                    throw Error('Operation failed');
                }
                setDownloading(false);
                link.click();
            }
        })
        .catch(error => {
            if(axios.isAxiosError(error)) {
                setDownloading(false);
                setError(error.message);
            } else {
                setDownloading(false);
                setError('Something went wrong, please try again');
            }
        })

        return function cleanup() {
            mounted = false;
        }
    }, [url, fileType])

    return {file, fileName, downloading, error}
}