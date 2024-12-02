import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { DateTime } from "luxon";
import Calendar from "../components/calendar/calendar";

function PaymentSchedule() {
    const [date, setDate] = useState(DateTime.now().startOf("month"));
    const [activeDay, setActiveDay] = useState(DateTime.now().day);

    const data = useLiveQuery(() =>
        db.calendar.where({ Month: date.month, Year: date.year }).toArray(),
    );

    const day = useLiveQuery(
        () =>
            db.calendar.get({
                Month: date.month,
                Year: date.year,
                Day: activeDay,
            }),
        [activeDay],
    );

    const handleSelection = (day) => {
        setActiveDay(day);
    };

    const spaceOffsets = [];

    for (let i = 0; i < date.weekday; i++) {
        spaceOffsets.push(
            <div
                key={i}
                className="grid justify-center bg-border text-copy dark:bg-dark-border dark:text-dark-copy"
            ></div>,
        );
    }

    return (
        <>
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="text-extrabold mx-4 text-2xl text-copy dark:text-dark-copy"
                >
                    Home
                </Link>
            </div>
            <div className="flex justify-center text-3xl font-extrabold text-primary dark:text-primary-light">
                <h1>
                    {date.monthLong} {date.year}
                </h1>
            </div>
            <Calendar
                currentMonth={data}
                offSet={spaceOffsets}
                handleSelection={handleSelection}
            />
            <div>
                <h1 className="text-7xl dark:text-dark-copy">{day?.Day}</h1>
                <h1
                    className={
                        day?.Deposits?.length > 0
                            ? "text-5xl dark:text-dark-copy"
                            : "hidden"
                    }
                >
                    Deposits:
                </h1>
                {day?.Deposits?.map((deposit) => (
                    <div key={deposit.id}>
                        <div className="m-2 flex flex-row border-border dark:border-dark-border dark:text-dark-copy">
                            <p>
                                {deposit.Name}:{" "}
                                {`$${Number(deposit.Amount).toFixed(2)}`}
                            </p>
                            <input
                                type="checkbox"
                                defaultValue={deposit.Completed}
                                className="mx-2"
                            />
                        </div>
                    </div>
                ))}
                <h1
                    className={
                        day?.Withdrawals?.length > 0
                            ? "text-5xl dark:text-dark-copy"
                            : "hidden"
                    }
                >
                    Withdrawals:
                </h1>
                {day?.Withdrawals?.map((withdrawals) => (
                    <div key={withdrawals.id}>
                        <div className="m-1 flex flex-row text-copy dark:text-dark-copy">
                            <p>
                                {withdrawals.Name}:{" "}
                                {`$${Number(withdrawals.Amount).toFixed(2)}`}
                            </p>
                            <input
                                type="checkbox"
                                defaultValue={withdrawals.Completed}
                                className="mx-2"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default PaymentSchedule;
