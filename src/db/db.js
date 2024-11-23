import Dexie from "dexie";
import { DateTime } from "luxon";
import { getArrayOfDaysInMonth, getMonthlyOccurances } from "../utils/utils";

export const db = new Dexie('dexie-butler')
db.version(1).stores({
    calendar: '++id, [Month+Year],[Year+Month],[Month+Year+Day]',
    budgetItems: '++id, Category, Type',
})

db.open().catch((error)=>{
    console.error(error)
})
// Remove before going live
db.on("populate",async()=>{
    db.budgetItems.put({Name:"Income",Amount:1141.8,Date:"2024-11-01",Interval:"Weekly",Category:"Deposits",Type:"income"})

    db.budgetItems.put({Name:"Child Care",Amount:150,Date:"2024-11-04",Interval:"Weekly",Category:"Withdrawals",Type:"expense"})
    db.budgetItems.put({Name:"Gas",Amount:25,Date:"2024-11-04",Interval:"Weekly",Category:"Withdrawals",Type:"expense"})
    db.budgetItems.put({Name:"Food",Amount:10,Date:"2024-11-04",Interval:"Weekly",Category:"Withdrawals",Type:"expense"})
    db.budgetItems.put({Name:"Car Ins",Amount:134.68,Date:"2024-11-26",Interval:"Monthly",Category:"Withdrawals",Type:"expense"})
    db.budgetItems.put({Name:"Rent",Amount:1337,Date:"2024-11-01",Interval:"Monthly",Category:"Withdrawals",Type:"expense"})
    db.budgetItems.put({Name:"Phone",Amount:1337,Date:"2024-11-30",Interval:"Monthly",Category:"Withdrawals",Type:"expense"})
    db.budgetItems.put({Name:"Accord",Amount:659,Date:"2024-11-21",Interval:"Monthly",Category:"Withdrawals",Type:"expense"})

    db.budgetItems.put({Name:"UpStart",Amount:794.89,Date:"2024-11-16",Interval:"Monthly",Total:23218.61,Category:"Withdrawals",Type:"debt"})
    db.budgetItems.put({Name:"CC",Amount:150,Date:"2024-11-16",Interval:"Monthly",Total:8000,Category:"Withdrawals",Type:"debt"})
})


db.on("ready",async()=>{
    const month = DateTime.now().month
    const year = DateTime.now().year
    const currentMonthArray = getArrayOfDaysInMonth()
    const allCalendar = await db.calendar.toArray()
    let currentCalendar = await db.calendar.where({Month:month,Year:year}).toArray()
    //update calendar table so it contains current month and
    // all deposits/withdrawals present in budgetItems 
    if(allCalendar.length < 1 || currentCalendar.length < 1){
        const budgetItems = await db.budgetItems.toArray()
        console.log("Need to generate current month calendar")
        currentMonthArray.forEach(async(day)=>{
            await db.calendar.put({Month:day[1],Year:day[0],Day:day[2],Deposits:[],Withdrawals:[]})
        })
        currentCalendar = await db.calendar.where({Month:month,Year:year}).toArray()
        //need to update all budgetItem occurances when new month occurs.
        budgetItems.forEach(async(budgetItem)=>{
            let occurances = getMonthlyOccurances(budgetItem.Date,budgetItem.Interval)
            await db.budgetItems.update(budgetItem.id,{Occurances:occurances})
            let newItem = {...budgetItem,Occurances:occurances}
            addOccurancesToCalendar(newItem)
        })
        // need to update calendar after is is create with new Occurnaces.
    }
    console.log("Database is ready.")
})

export const categoryItemUpdated = async(item)=>{
    if (!item.hasOwnProperty("id")) {
        console.log("need to add item");
        let newId = await db.budgetItems.add(item)
        console.log(`New ID: ${newId}`)
        if(newId){
            let newItem = {...item,id:newId}
            addOccurancesToCalendar(newItem)
        }
    } else {
        console.log("need to update item");
        const oldItem = await db.budgetItems.get(item.id)
        await db.budgetItems.put(item)
        if(JSON.stringify(oldItem.Occurances) != JSON.stringify(item.Occurances)){
            removeOccurancesFromCalendar(item.id,item.Category,item.Occurances)
            
        }
        addOccurancesToCalendar(item)
    }
}

export function removeOccurancesFromCalendar(id,category,occurances){
    occurances.forEach(async(occurance)=>{
        let date = DateTime.fromISO(occurance)
        let day = await db.calendar.get({Month:date.month,Year:date.year,Day:date.day})
        let items
        if(day[category]){
            items = day[category].filter((item)=>{item.id != id})
            await db.calendar.update(day.id,{[category]:items})
        }
    })
}

export function addOccurancesToCalendar(item){
    
    item.Occurances.forEach(async(occurance)=>{
        let date = DateTime.fromISO(occurance)
        console.log(occurance)
        console.log(`Date: ${date.year}-${date.month}-${date.day},Type: ${item.Type},Interval: ${item.Interval}`)
        let day = await db.calendar.get({Month:date.month,Year:date.year,Day:date.day})
        let items
        let newItems
        console.log(day[item.Category])
        if(day[item.Category]){
            console.log("adding item to existing category")
            items = day[item.Category].filter((x)=>{x.id != item.id})
            newItems = [...items,{id:item.id,Name:item.Name,Amount:item.Amount,Completed:false}]
        } else {
            console.log("adding first item to category")
            newItems = [{id:item.id,Name:item.Name,Amount:item.Amount,Completed:false},]
        }
        let newDay = {...day,[item.Category]:newItems}
        await db.calendar.put(newDay)
    })

}