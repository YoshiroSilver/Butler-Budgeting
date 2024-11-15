import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db-hook";

import { IoAddCircleOutline } from "react-icons/io5";
import Card from "../components/card/Card";
import EditCard from "../components/card/EditCard";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [editMode, setEditMode] = useState(false);
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
  }, []);

  const onEditClick = (item) => {
    editItem.current = item;
    console.log(editItem);
  };
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

  const onSaveClick = () => {};

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
        <button className="m-4 size-20 self-center rounded-full bg-primary text-copy hover:bg-primary-content hover:text-primary dark:text-dark-copy">
          <IoAddCircleOutline
            className="size-20"
            onClick={() => setEditMode(!editMode)}
          />
        </button>
      </div>
      {editMode ? (
        <div className="flex justify-center">
          <EditCard />
        </div>
      ) : (
        <Fragment />
      )}
      <div className="flex flex-wrap justify-center">
        {incomes && incomes.length > 0 ? (
          incomes.map((item) => (
            <Card
              key={item.id}
              item={item}
              handleDelete={onDeleteClick}
              handleEdit={onEditClick}
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
