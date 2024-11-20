import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db-hook";

import Card from "../components/card/Card";
import EditCard from "../components/card/EditCard";
import { getMonthlyOccurances } from "../utils/utils";

function CategoryPage({ dbName, defaultItem }) {
    const [data, setData] = useState([]);
    const [updatedData, setUpdatedData] = useState(false);
    const TITLE = dbName.charAt(0).toUpperCase() + dbName.slice(1);
    const db = useIndexedDB(dbName);

    useEffect(() => {
        db.getAll().then(
            (results) => {
                setData(results);
            },
            (error) => {
                console.log(error);
            },
        );
        setUpdatedData(false);
    }, [updatedData]);
    const onDeleteClick = (id) => {
        // delete item, them get new list of incomes
        db.deleteRecord(id).then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
            },
        );
        setUpdatedData(true);
    };

    const handleUpdate = (item) => {
        const occurances = getMonthlyOccurances(item.Date, item.Interval);
        const newItem = { ...item, Occurances: occurances };
        if (newItem.hasOwnProperty("id")) {
            //update item based on id
            db.update(newItem).then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.error(error);
                },
            );
        } else {
            //create new item.
            db.add(newItem).then(
                (result) => {
                    console.log("Added new Item");
                    console.log(result);
                },
                (error) => {
                    console.error(error);
                },
            );
        }
        setUpdatedData(true);
    };

    return (
        <>
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="text-extrabold mx-4 text-2xl text-copy dark:text-dark-copy"
                >
                    Back
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
                        No income supplied yet.
                    </span>
                )}
            </div>
        </>
    );
}

export default CategoryPage;
