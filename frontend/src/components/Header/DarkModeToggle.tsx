import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun } from "@fortawesome/free-solid-svg-icons"
import { faMoon } from "@fortawesome/free-solid-svg-icons"

export const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false)

    const handleToggle = () => {
        setIsDarkMode((prev) => !prev)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <div className="w-8 h-8 rounded-full border flex align-middle justify-center">
            <button
                onClick={handleToggle}
                className="text-white"
                aria-label="Toggle Dark Mode"
            >
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
        </div>
    )
}
