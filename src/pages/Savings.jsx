import React from "react";
import { Link } from "react-router-dom";

import { IoAddCircleOutline } from "react-icons/io5";
import Card from "../components/card/Card";

function Savings() {
  const data = [
    {
      id: 1,
      name: "Bella Christmas",
      content: {
        Allocated: 0,
        Goal_Date: "2024-11-30",
        Total: 400,
      },
    },
    {
      id: 2,
      name: "Liam Christmas",
      content: {
        Allocated: 0,
        Goal_Date: "2024-11-30",
        Target: 400,
      },
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
          Savings
        </h1>
        <button className="m-4 size-20 self-center rounded-full bg-primary text-copy hover:bg-primary-content hover:text-primary dark:text-dark-copy">
          <IoAddCircleOutline className="size-20" />
        </button>
      </div>
      {data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </>
  );
}

export default Savings;
