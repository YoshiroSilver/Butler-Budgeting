import React, { Fragment, useState } from "react";
import { IoPencilSharp, IoTrashSharp } from "react-icons/io5";
import EditCard from "./EditCard";

function Card({ item, handleDelete, handleUpdate }) {
    return (
        <div className="m-2 h-fit rounded-xl bg-foreground dark:bg-dark-foreground">
            <div className="flex flex-row justify-between">
                <h1 className="m-2 text-xl font-extrabold text-copy dark:text-dark-copy">
                    {item.Name}
                </h1>
                <div className="flex justify-end">
                    <EditCard
                        item={item}
                        title="Edit"
                        handleUpdate={handleUpdate}
                    />
                    <IoTrashSharp
                        className="mx-2 my-1 size-6 text-error"
                        onClick={() => handleDelete(item.id)}
                    />
                </div>
            </div>
            <div>
                <div className="flex flex-wrap justify-center">
                    {Object.entries(item).map(([key, value]) =>
                        key === "Name" ||
                        key === "id" ||
                        key === "Occurances" ||
                        key === "Category" ||
                        key === "Type" ? (
                            <Fragment key={key} />
                        ) : (
                            <div
                                key={`${key}_${value}`}
                                className="m-2 flex w-fit flex-col rounded-lg border border-border dark:border-dark-border"
                            >
                                <h2 className="px-2 py-1 text-lg font-bold text-copy dark:text-dark-copy">
                                    {key}
                                </h2>
                                <h2 className="px-2 py-1 text-right text-lg font-bold text-copy dark:text-dark-copy">
                                    {key === "Amount" || key === "Total"
                                        ? `$${Number(value).toFixed(2)}`
                                        : value}
                                </h2>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;
