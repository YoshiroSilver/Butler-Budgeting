import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { DateTime } from "luxon";

function PaymentSchedule() {
    const data = useLiveQuery(async () => {
        const data = db.calendar
            .toArray((result) => {
                return result;
            })
            .catch((err) => {
                console.error(err);
            });
        checkCalendarData(data);
        return data;
    });

    console.log(`Calendar Data: ${JSON.stringify(data)}`);
    function checkCalendarData(data) {
        const today = DateTime.now().toISODate();
        if (data.length > 1 || !data.hasOwnProperty(today)) {
            console.log("Calender needs to update for current month.");
        }
    }
    return (
        <>
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="text-extrabold mx-4 text-2xl text-copy dark:text-dark-copy"
                >
                    Back
                </Link>
            </div>
            <div className="text-copy dark:text-dark-copy">
                Calendar goes here
            </div>
        </>
    );
}

export default PaymentSchedule;
