import { useState } from "react"

import '../../styles/TextContainer.css';

interface TextContainerProps {
    text: string
}

export const TextContainer = ({ text }: TextContainerProps) => {
    const [expand, setExpand] = useState(false);
    const [style, setStyle] = useState("container");

    const handleExpand = () => {
        if(!expand) {
            setExpand(true);
            setStyle("container-expanded");
        } else {
            setExpand(false);
            setStyle("container");
        }
    }

    return (
        <div className={style}>
            <p>
                {
                    !expand && 
                    <>
                        {text.substring(0, 120)}...
                    </>
                }
                {
                    expand &&
                    <>
                        {text}
                    </>
                }
            </p>
            <button className="expand-button" onClick={handleExpand}>
                {expand? "Less...": "Read more..."}
            </button>
        </div>
    )
}