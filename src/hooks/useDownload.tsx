import axios from "axios";
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

        axios({
            url: `${process.env.REACT_APP_API_URL}/${url}`,
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            },
            method: 'GET',
            responseType: 'blob'
        })
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
                    throw Error('No ha sido posible completar la operación');
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
                setError('Algo ha ido mal, inténtelo de nuevo más tarde');
            }
        })

        return function cleanup() {
            mounted = false;
        }
    }, [url, fileType])

    return {file, fileName, downloading, error}
}