import { useEffect, useState } from "react";

export function useDownload(url: string, fileType: string) {
    const [downloading, setDownloading] = useState(true);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if(url === '' || fileType === '') {
            return;
        }
        fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
            headers: {
                'content-type': `${fileType};charset=UTF-8`
            }
        })
        .then(res => {
            if(!res.ok) {
                throw Error("No ha sido posible completar la operación");
            } else {
                return res.blob()
            }
        })
        .then(data => {
            const downloadLink = window.URL.createObjectURL(data);
            setFile(downloadLink);
            const link = document.createElement('a');
            link.href = downloadLink;
            if(fileType === 'text/csv') {
                link.setAttribute('download', `file.csv`);
                setFileName('file.csv');
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
        })
        .catch(error => {
            setError(error.message);
            setDownloading(false);
        });
    }, [url, fileType])

    return {file, fileName, downloading, error}
}