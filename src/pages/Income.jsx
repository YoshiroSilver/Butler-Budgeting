import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db-hook";

import { IoAddCircleOutline } from "react-icons/io5";
import Card from "../components/card/Card";
import EditCard from "../components/card/EditCard";

function Income() {
    const [incomes, setIncomes] = useState([]);
    const [updatedIncome, setUpdatedIncome] = useState(false);
    const defaultItem = { Name: "", Amount: "", Date: "", Interval: "" };
    const editItem = useRef(defaultItem);
    const db = useIndexedDB("income");

    useEffect(() => {
        db.getAll().then(
            (results) => {
                setIncomes(results);
            },
            (error) => {
                console.log(error);
            },
        );
        setUpdatedIncome(false);
    }, [updatedIncome]);
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
        db.getAll().then(
            (results) => {
                setIncomes(results);
            },
            (error) => {
                console.log(error);
            },
        );
    };

    const handleUpdate = (item) => {
        if (item.hasOwnProperty("id")) {
            //update item based on id
            db.update(item, item.id).then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.error(error);
                },
            );
        } else {
            //create new item.
            db.add(item).then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.error(error);
                },
            );
        }
        setUpdatedIncome(true);
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
                    Income
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
                {incomes && incomes.length > 0 ? (
                    incomes.map((item) => (
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

export default Income;
