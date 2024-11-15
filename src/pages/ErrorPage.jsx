import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1 className="m-2 text-center text-3xl font-extrabold text-copy dark:text-dark-copy">
        Oops!
      </h1>
      <p className="text-center text-copy dark:text-dark-copy">
        Sorry, an unexpected error has occured.
      </p>
      <p className="text-center text-copy dark:text-dark-copy">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
