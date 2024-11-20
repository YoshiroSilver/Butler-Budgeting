export const DBConfig = {
    name: "Butler-Budget",
    version: 4,
    objectStoresMeta: [
        {
            store: "income",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "Name", keyPath: "Name", options: { unique: true } },
                { name: "Amount", keyPath: "Amount", options: { unique: false } },
                { name: "Interval", keyPath: "Interval", options: {unique: false}},
                { name: "Date", keyPath: "Date", options: {unique: false}},
                { name: "Occurances", keyPath: "Occurances", options: {unique: false}},
            ],
        },
        {
            store: "expense",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "Name", keyPath: "Name", options: { unique: true } },
                { name: "Amount", keyPath: "Amount", options: { unique: false } },
                { name: "Interval", keyPath: "Interval", options: {unique: false}},
                { name: "Date", keyPath: "Date", options: {unique: false}},
                { name: "Occurances", keyPath: "Occurances", options: {unique: false}},
            ],
        },
        {
            store: "debt",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "Name", keyPath: "Name", options: { unique: true } },
                { name: "Amount", keyPath: "Amount", options: { unique: false } },
                { name: "Interval", keyPath: "Interval", options: {unique: false}},
                { name: "Date", keyPath: "Date", options: {unique: false}},
                { name: "Total", keyPath: "Total", options: {unique: false}},
                { name: "Occurances", keyPath: "Occurances", options: {unique: false}},
            ],
        },
        {
            store: "savings",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "Name", keyPath: "Name", options: { unique: true } },
                { name: "Amount", keyPath: "Amount", options: { unique: false } },
                { name: "Interval", keyPath: "Interval", options: {unique: false}},
                { name: "Date", keyPath: "Date", options: {unique: false}},
                { name: "Occurances", keyPath: "Occurances", options: {unique: false}},
            ],
        },
        {
            store: "calendar",
            storeConfig: {keyPath: "isoDate"},
            storeSchema: [
                {name: "Month", keyPath: "Month",options:{unique: true}},
                {name: "Year", keyPath: "Year",options:{unique: true}},
                {name: "Day", keyPath: "Day",options:{unique: true}},
                {name: "Deposits", keyPath: "Deposits",options:{unique: false}},
                {name: "Withdrawals", keyPath: "Withdrawals",options:{unique: false}},
            ]
        }
    ]
}