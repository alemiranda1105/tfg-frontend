import { useCallback, useEffect, useState } from "react"
import { BsArrowUp } from 'react-icons/bs'

export function GoTopButton() {
    const [showButton, setShowButton] = useState(false)
    const handleNavigation = useCallback(
        e => {
        const window = e.currentTarget
        setShowButton(window.scrollY > 0)
        }, []
    )
    
    const scrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        // Scroll
        window.addEventListener("scroll", handleNavigation)
        return () => {
            window.removeEventListener("scroll", handleNavigation)
        }
    }, [handleNavigation])

    return (
        <>
            {
                showButton &&
                <div className="fixed bottom-0 right-0">
                <button onClick={scrollTop} className="m-3 w-16 h-16 bg-blue-200 shadow-md rounded-full hover:bg-slate-200 active:shadow-lg transition ease-in duration-200 focus:outline-none">
                    <div className="flex items-center justify-center">
                        <BsArrowUp size={22} />
                    </div>
                </button>
                </div>
            }
        </>
    )
}