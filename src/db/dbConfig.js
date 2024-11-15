
export const DBConfig = {
    name: "Butler-Budget",
    version: 1,
    objectStoresMeta: [
        {
            store: "income",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "Name", keyPath: "Name", options: { unique: true } },
                { name: "Amount", keyPath: "Amount", options: { unique: false } },
                { name: "Interval", keyPath: "Interval", options: {unique: false}},
                { name: "Date", keyPath: "Date", options: {unique: false}},
            ],
        }
    ]
}