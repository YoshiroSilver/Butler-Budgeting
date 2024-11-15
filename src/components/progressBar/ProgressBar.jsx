import React from "react";
import { Link } from "react-router-dom";

function ProgressBar({ title, amount, total, desc = "Total" }) {
  const percentage = `${(amount / total) * 100}%`;
  return (
    <Link to={title}>
      <div className="m-4 flex flex-col content-center justify-center rounded-full border-2 border-primary bg-foreground md:flex-row dark:border-primary-dark dark:bg-dark-foreground">
        <div className="content-center">
          <h1 className="m-2 text-center text-2xl font-bold text-copy dark:text-dark-copy">
            {title}
          </h1>
        </div>
        <div className="h-10 w-5/6 self-center overflow-hidden rounded-full border-2 border-border md:w-2/3 dark:border-dark-border">
          <div className="h-full w-full bg-background dark:bg-dark-background">
            <div
              className="h-full w-full bg-primary dark:bg-primary-dark"
              style={{ width: percentage }}
            ></div>
          </div>
        </div>
        <div className="m-1 flex flex-col content-end">
          <h1 className="text-center text-2xl font-bold text-copy dark:text-dark-copy">
            {desc}
          </h1>
          <h1 className="text-center text-2xl font-bold text-copy md:text-right dark:text-dark-copy">{`$${total.toFixed(2)}`}</h1>
        </div>
      </div>
    </Link>
  );
}

export default ProgressBar;
