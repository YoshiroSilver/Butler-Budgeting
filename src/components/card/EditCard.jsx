import React, { Fragment, useState } from "react";
import { IoPencilSharp, IoAddCircleSharp } from "react-icons/io5";

function EditCard({ item, title, handleUpdate }) {
    const [modal, setModal] = useState(false);

    const handleFormSubmit = (e) => {
        let newItem = { ...item };
        for (let index = 0; index < e.target.length - 1; index++) {
            newItem = {
                ...newItem,
                [e.target[index].id]: e.target[index].value,
            };
        }
        if (title === "New") {
            e.preventDefault();
        }
        if (JSON.stringify(item) === JSON.stringify(newItem)) {
            //early exit no need to attempt an update
            toggleModal();
            return;
        }
        handleUpdate(newItem);
        toggleModal();
    };

    const toggleModal = () => {
        setModal(!modal);
    };
    return (
        <>
            {title != "New" ? (
                <IoPencilSharp
                    className="mx-2 my-1 size-6 text-primary-dark dark:text-primary-light"
                    onClick={toggleModal}
                />
            ) : (
                <IoAddCircleSharp
                    className="mx-2 my-1 size-20 text-primary-dark dark:text-primary-light"
                    onClick={toggleModal}
                />
            )}

            {modal && (
                <div className="fixed inset-0 z-40 flex min-h-full items-center overflow-y-auto overflow-x-hidden transition">
                    <div className="fixed inset-0 h-full w-full cursor-pointer bg-dark-background/50 dark:bg-background/50" />

                    <div className="pointer-events-none relative my-auto w-full cursor-pointer p-4 transition">
                        <div className="pointer-events-auto relative mx-auto w-full max-w-sm cursor-default rounded-xl bg-foreground py-2 dark:bg-dark-foreground">
                            <button
                                type="button"
                                className="absolute right-2 top-2 rtl:left-2 rtl:right-auto"
                                onClick={toggleModal}
                            >
                                <svg
                                    xlinkTitle="Close"
                                    className="h-4 w-4 cursor-pointer text-copy transition-all duration-500 ease-in-out hover:rotate-180 dark:text-dark-copy"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>

                            <div className="space-y-2 p-2">
                                <div className="space-y-2 p-2 text-center text-copy dark:text-dark-copy">
                                    <h2
                                        className="text-xl font-bold tracking-tight"
                                        id="page-action.heading"
                                    >
                                        {title}
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div
                                    aria-hidden="true"
                                    className="border-t border-border px-2 dark:border-dark-border"
                                ></div>

                                <div className="grid grid-cols-1 place-items-center px-4 py-2">
                                    <form
                                        id="EditCardForm"
                                        noValidate
                                        className="space-y-4"
                                        onSubmit={(e) => handleFormSubmit(e)}
                                    >
                                        {Object.entries(item).map(
                                            ([key, value]) => {
                                                return key === "id" ? (
                                                    <Fragment
                                                        key={`${key}_${value}`}
                                                    />
                                                ) : (
                                                    <div
                                                        key={`${key}_${value}`}
                                                    >
                                                        <label
                                                            htmlFor={key}
                                                            className="mb-2 text-lg text-copy-light dark:text-dark-copy-light"
                                                        >
                                                            {key}
                                                            <span className="inline-block p-1 text-sm text-error">
                                                                *
                                                            </span>
                                                        </label>
                                                        {key === "Interval" ? (
                                                            <select
                                                                defaultValue={
                                                                    value
                                                                }
                                                                id={key}
                                                                className="w-full rounded-lg border border-border bg-foreground p-3 text-copy shadow-md duration-300 ease-in-out placeholder:text-base focus:outline-none dark:border-dark-border dark:bg-dark-foreground dark:text-dark-copy dark:shadow-gray-400"
                                                            >
                                                                <option value="Weekly">
                                                                    Weekly
                                                                </option>
                                                                <option value="Bi-Weekly">
                                                                    Bi-Weekly
                                                                </option>
                                                                <option value="Monthly">
                                                                    Monthly
                                                                </option>
                                                                <option value="Yearly">
                                                                    Yearly
                                                                </option>
                                                            </select>
                                                        ) : (
                                                            <input
                                                                id={key}
                                                                className="w-full rounded-lg border border-border bg-foreground p-3 text-copy shadow-md duration-300 ease-in-out placeholder:text-base focus:outline-none dark:border-dark-border dark:bg-dark-foreground dark:text-dark-copy dark:shadow-gray-400"
                                                                type={
                                                                    key ===
                                                                    "Date"
                                                                        ? "date"
                                                                        : "text"
                                                                }
                                                                defaultValue={
                                                                    value
                                                                }
                                                                required
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            },
                                        )}
                                    </form>
                                </div>

                                <div
                                    aria-hidden="true"
                                    className="border-b border-gray-700 px-2"
                                ></div>
                                <div className="px-6 py-2">
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2">
                                        <button
                                            onClick={toggleModal}
                                            type="button"
                                            className="focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:focus:text-primary-400 dark:focus:border-primary-400 inline-flex min-h-[2.25rem] items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-800 outline-none transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700 dark:focus:bg-gray-800 dark:focus:ring-offset-0"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            form="EditCardForm"
                                            type="submit"
                                            className="inline-flex min-h-[2.25rem] items-center justify-center gap-1 rounded-lg border border-transparent bg-primary px-4 py-1 text-sm font-medium text-primary-content shadow outline-none transition-colors hover:bg-primary-dark focus:bg-[#11071F] focus:ring-2 focus:ring-inset focus:ring-white focus:ring-offset-2 focus:ring-offset-[#11071F] dark:shadow-gray-400 dark:focus:ring-offset-0"
                                        >
                                            <span className="flex items-center gap-1">
                                                <span className="">Send</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditCard;
