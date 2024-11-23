import Dexie from "dexie";
import { DateTime } from "luxon";

export const db = new Dexie('dexit-butler')
db.version(1).stores({
    calendar: '++id, [Month+Year]',
    budgetItems: '++id, Category, Type',
})

db.open().catch((error)=>{
    console.error(error)
})

db.on("populate",function(){
    db.calendar.put({Month:11,Year:2024,Day:1,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:2,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:3,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:4,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:5,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:6,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:7,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:8,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:9,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:10,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:11,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:12,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:13,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:14,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:15,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:16,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:17,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:18,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:19,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:20,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:21,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:22,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:23,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:24,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:25,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:26,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:27,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:28,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:29,Deposits:[],Withdrawals:[]})
    db.calendar.put({Month:11,Year:2024,Day:30,Deposits:[],Withdrawals:[]})
})

db.on("ready",async(vibDB)=>{
    const month = DateTime.now().month
    const year = DateTime.now().year
    const allCalendar = await db.calendar.toArray()
    const currentCalendar = await db.calendar.where({Month:month,Year:year}).toArray()
    //update calendar table so it contains current month and
    // all deposits/withdrawals present in budgetItems 
    if(allCalendar.length < 1 || currentCalendar.length < 1){
        console.log(`AllCalendar: ${allCalendar.length}`)
        console.log(`CurrentCalendar: ${currentCalendar.count}`)
        console.log("Need to generate current month calendar")
    }
})