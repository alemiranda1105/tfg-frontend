import { useEffect, useState } from "react";

export function useDownload(url: string, fileType: string) {
    const [downloading, setDownloading] = useState(true);
    const [error, setError] = useState("");

    console.log(`${process.env.REACT_APP_API_URL}`);

    useEffect(() => {
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
            setDownloading(false);
            const downloadLink = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadLink;
            if(fileType === 'text/csv') {
                link.setAttribute('download', `file.csv`);
            } else if(fileType === 'application/vnd.ms-excel') {
                link.setAttribute('download', `file.xlsx`);
            } else {
                link.setAttribute('download', `file.json`);
            }
            link.click();
        })
        .catch(error => {
            setError(error);
            setDownloading(false);
        });
    }, [url, fileType])

    return {downloading, error}
}