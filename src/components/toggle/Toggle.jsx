import React from "react";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

function Toggle({ onIcon, offIcon, onClick, isOn }) {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} text-copy dark:text-dark-copy ${isOn ? "hidden" : ""}`}
        onClick={() => {
          onClick(!isOn);
        }}
      >
        <div>{onIcon}</div>
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} text-copy dark:text-dark-copy ${isOn ? "" : "hidden"}`}
        onClick={() => {
          onClick(!isOn);
        }}
      >
        <div className="md:txt-sm relative z-10 text-lg">{offIcon}</div>
        <span className="relative z-10">Dark</span>
      </button>
    </div>
  );
}

export default Toggle;
