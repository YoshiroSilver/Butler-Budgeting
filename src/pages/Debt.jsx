import React from "react";
import { Link } from "react-router-dom";

import { IoAddCircleOutline } from "react-icons/io5";
import Card from "../components/card/Card";

function Debt() {
  const debts = [
    {
      id: 1,
      Name: "Skylar CC",
      Amount: 150,
      Interval: "Monthly",
      Date: "2024-10-13",
      Total: 6781.45,
    },
    {
      id: 2,
      Name: "UpStart",
      Amount: 999.0,
      Interval: "Monthly",
      Date: "2024-10-02",
      Total: 29000,
    },
  ];
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
          Debt
        </h1>
        <button className="m-4 size-20 self-center rounded-full bg-primary text-copy hover:bg-primary-content hover:text-primary dark:text-dark-copy">
          <IoAddCircleOutline className="size-20" />
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {debts && debts.length > 0 ? (
          debts.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <span className="text-extrabold flex justify-center text-center text-4xl text-copy dark:text-dark-copy">
            No debt supplied yet.
          </span>
        )}
      </div>
    </>
  );
}

export default Debt;
