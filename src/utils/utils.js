import { DateTime } from "luxon"

//Returns list of occurances for a supplied example date and the interval
// intervals - Weekly 7, Bi-Weekly 14, all else just returns provided date in current month/year
// example date is ISO string format 'YYYY-MM-DD'
export function getMonthlyOccurances(date,interval) {
    console.log(`Interval string: ${interval}`)
    const intervalValue = interval === "Weekly" ? 7 : interval === "Bi-Weekly" ? 14 : 0

    console.log(`Interval Value: ${intervalValue}`)
    const startOfCurrentMonth = DateTime.now().startOf('month')
    const suppliedDate = DateTime.fromISO(date)
    if(intervalValue === 0){
        return [`${startOfCurrentMonth.year}-${startOfCurrentMonth.month}-${suppliedDate.day}`,]
    }
    //if date is before current month
    const diff = suppliedDate.month < startOfCurrentMonth.month ? 
        startOfCurrentMonth.diff(suppliedDate,'days').days % intervalValue : 
        suppliedDate.diff(startOfCurrentMonth,'days').days % intervalValue

    console.log(`Diff: ${diff}`)

    let index = startOfCurrentMonth.plus({days: diff}).day

    console.log(`Index: ${index}`)
    let occurances =[]

    while (index <= startOfCurrentMonth.endOf('month').day) {
        occurances.push(`${startOfCurrentMonth.year}-${startOfCurrentMonth.month}-${index}`)
        index += intervalValue
    }

    return occurances

}

export function getArrayOfDaysInMonth() {
    const year = DateTime.now().year
    const month = DateTime.now().month
    const lastDay = DateTime.now().endOf('month').day
    let dateArray = []
    let index = 1
    for(index;index <= lastDay;index++){
        dateArray.push([year, month, index])
    }
    return dateArray
}