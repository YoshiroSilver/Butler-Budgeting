import React from "react";
import { DateTime } from "luxon";

function Calendar({ currentMonth, offSet, handleSelection }) {
    const daysInWeek = ["s", "M", "T", "W", "T", "F", "s"];
    return (
        <div className="border border-border bg-foreground dark:border-dark-border dark:bg-dark-foreground">
            <div className="grid grid-cols-7 border-b-2 border-primary text-copy dark:text-dark-copy">
                {daysInWeek.map((day, idx) => (
                    <div className="grid justify-center" key={idx}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-flow-row grid-cols-7">
                {offSet}
                {currentMonth?.map((day) => (
                    <div
                        className={`m-1 grid justify-center ${DateTime.local(day.Year, day.Month, day.Day).startOf("day").toISODate() === DateTime.now().startOf("day").toISODate() ? "bg-primary text-primary-content" : "text-copy dark:text-dark-copy"} `}
                        key={day.id}
                        onClick={() => {
                            handleSelection(day.Day);
                        }}
                    >
                        {day.Day}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar;
