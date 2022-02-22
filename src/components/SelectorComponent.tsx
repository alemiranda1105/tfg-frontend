import { useEffect, useState } from "react";

export interface SelectorProps {
    negativeTxt: string,
    positiveTxt: string,
    status: boolean
    setStatus: (new_status: boolean) => void
}

export function SelectorComponent({ negativeTxt, positiveTxt, status, setStatus }: SelectorProps) {
    // CSS classes
    const defClasses = "my-2 bg-slate-100/20 p-1 md:p-3 border-2 rounded-md text-sm ease-in-out duration-300";
    const defMarkClasses = "my-2 bg-blue-500/60 p-1 md:p-3 border-2 rounded-lg text-sm text-white font-bold shadow-lg ease-in-out duration-300";
    const [positiveClasses, setPosClasses] = useState(defClasses);
    const [negativeClasses, setNegClasses] = useState(defClasses);

    const handleStatus = (new_status: boolean) => {
        setStatus(new_status);
        if (new_status) {
            setPosClasses(defMarkClasses);
            setNegClasses(defClasses);
        } else {
            setNegClasses(defMarkClasses);
            setPosClasses(defClasses);
        }
    };

    useEffect(() => {
        if(status) {
            setPosClasses(defMarkClasses);
        } else {
            setNegClasses(defMarkClasses);
        }
    }, [status]);

    return (
        <div className="flex">
            <div className={positiveClasses} onClick={() => handleStatus(true)}>
                {positiveTxt}
            </div>
            <div className={negativeClasses} onClick={() => handleStatus(false)}>
                {negativeTxt}
            </div>
        </div>
    );
}
