import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Outlet } from "react-router-dom";

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
      <Toggle
        onIcon={<FiSun />}
        offIcon={<FiMoon />}
        onClick={handleThemeClick}
        isOn={darkMode}
      />
      <Outlet />
    </>
  );
}

export default Root;
