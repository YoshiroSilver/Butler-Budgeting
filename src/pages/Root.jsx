import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { IoCalendarSharp } from "react-icons/io5";

import Toggle from "../components/toggle/Toggle";

function Root() {
    const [darkMode, setDarkMode] = useState(
        localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches),
    );

    useEffect(
        () =>
            document.documentElement.classList.toggle("dark", darkMode)
                ? console.log("light")
                : console.log("dark"),
        [darkMode],
    );

    const handleThemeClick = (theme) => {
        theme ? (localStorage.theme = "dark") : (localStorage.theme = "light");
        setDarkMode(theme);
    };
    return (
        <>
            <div className="flex justify-between">
                <Toggle
                    onIcon={<FiSun />}
                    offIcon={<FiMoon />}
                    onClick={handleThemeClick}
                    isOn={darkMode}
                />
                <Link to={"paymentSchedule"}>
                    <IoCalendarSharp className="m-2 size-10 text-copy dark:text-dark-copy" />
                </Link>
            </div>
            <Outlet />
        </>
    );
}

export default Root;
