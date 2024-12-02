import React from "react";

function HeroBox({ amount }) {
    return (
        <div className="mb-4 flex flex-col content-center items-center justify-center pt-8">
            <h1 className="mb-2 text-center text-3xl text-copy dark:text-dark-copy">
                Discretionary:
            </h1>
            <div className="w-56 rounded-lg border-4 border-border dark:border-dark-border">
                <h1 className="text-center text-3xl font-extrabold text-copy dark:text-dark-copy">{`$${amount.toFixed(2)}`}</h1>
            </div>
        </div>
    );
}

export default HeroBox;
