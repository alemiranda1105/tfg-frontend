import { useEffect, useState } from "react";

export interface SelectorProps {
    negativeTxt: string,
    positiveTxt: string,
    status: boolean
    setStatus: (new_status: boolean) => void
}

export function SelectorComponent({ negativeTxt, positiveTxt, status, setStatus }: SelectorProps) {
    // CSS classes
    const defClasses = "my-2 bg-slate-400/20 p-3 border-2 rounded-md text-sm";
    const defMarkClasses = "my-2 bg-slate-500 p-3 border-2 rounded-lg text-sm font-bold shadow-lg";
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
