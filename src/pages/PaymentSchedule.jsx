import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db-hook";

function PaymentSchedule() {
    const [data, setData] = useState([]);
    const [updatedData, setUpdatedData] = useState(false);
    const db = useIndexedDB("calendar");

    useEffect(() => {
        db.getAll().then(
            (results) => {
                setData(results);
            },
            (error) => {
                console.error(error);
            },
        );
    }, [updatedData]);

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
