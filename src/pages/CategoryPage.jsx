import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
//import { useIndexedDB } from "react-indexed-db-hook";
import {
    categoryItemUpdated,
    db,
    removeOccurancesFromCalendar,
} from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";

import Card from "../components/card/Card";
import EditCard from "../components/card/EditCard";
import { getMonthlyOccurances } from "../utils/utils";

function CategoryPage({ dbName, defaultItem }) {
    const data = useLiveQuery(async () => {
        const data = db.budgetItems
            .where("Type")
            .equals(dbName)
            .toArray((result) => {
                return result;
            })
            .catch((err) => {
                console.error(err);
            });
        return data;
    });
    const TITLE = dbName.charAt(0).toUpperCase() + dbName.slice(1);

    const onDeleteClick = async (id) => {
        const item = await db.budgetItems.get(id);
        removeOccurancesFromCalendar(item.id, item.Category, item.Occurances);
        await db.budgetItems.delete(id);
    };

    const handleUpdate = async (item) => {
        const occurances = getMonthlyOccurances(item.Date, item.Interval);
        const newItem = { ...item, Occurances: occurances, Type: dbName };
        await categoryItemUpdated(newItem);
    };

    return (
        <>
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="text-extrabold mx-4 text-2xl text-copy dark:text-dark-copy"
                >
                    Home
                </Link>
                <h1 className="text-extrabold text-center text-4xl text-copy dark:text-dark-copy">
                    {TITLE}
                </h1>
                <div className="flex justify-center">
                    <EditCard
                        item={defaultItem}
                        title="New"
                        handleUpdate={handleUpdate}
                    />
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <Card
                            key={item.id}
                            item={item}
                            handleDelete={onDeleteClick}
                            handleUpdate={handleUpdate}
                        />
                    ))
                ) : (
                    <span className="text-extrabold flex justify-center text-center text-4xl text-copy dark:text-dark-copy">
                        {`No ${dbName} supplied yet.`}
                    </span>
                )}
            </div>
        </>
    );
}

export default CategoryPage;
