const dateToTile = (date, cap = true, timeincluded = true, timeOnly = false) => {
    if (!date){
        return("")
    }
    // const timeZone = DeviceInfo.getTimezone()
    // var offsetInHours = new Date(date).getTimezoneOffset() / 60;
    // var newDate = new Date(date).setHours(new Date(date).getHours()+offsetInHours)
    // const optionsTime = {
    //     weekday: 'short', month: 'short', day: 'numeric', timeZoneName: 'short',
    //     hour12: true, hour: "numeric", minute: "numeric", dateStyle: "short"
    // };

    // const optionsNoTime = {
    //     weekday: 'short', month: 'short', day: 'numeric', timeZoneName: 'short', timeZone: 'GMT',
    // };

    const convertTZ = (date) => {
        return (new Date(date));
        // return (typeof date === "string" ? new Date(date) : date).toLocaleString("en-GB", time == true ? optionsNoTime : optionsNoTime);
    }


    const tzDate = convertTZ(date)
    // const tzDateList = tzDate.split(" ")
    // var timeList = tzDateList[3].split(":")
    var ampm = "AM"

    if (tzDate.getHours() >= 12) {
        if (tzDate.getHours() === 12) {
            ampm = String(tzDate.getHours()) + (tzDate.getMinutes() !== 0 ? ":" + tzDate.getMinutes() : "") + "PM"
        } else {
            ampm = String(tzDate.getHours() - 12) +
                (tzDate.getMinutes() !== 0 ?
                    tzDate.getMinutes() < 10 ?
                        ":0" + tzDate.getMinutes() :
                        ":"+tzDate.getMinutes() :
                    "")
                + "PM"
        }
    }
    else {
        ampm = String(tzDate.getHours()) + (tzDate.getMinutes() !== 0 ? ":" + tzDate.getMinutes() : "") + "AM"
    }
    if (timeOnly) { return (ampm) }
    const monthNamesLow = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const weekdayLow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthNamesCap = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
    ];
    const weekdayCap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const weekday = cap === true ? weekdayCap:weekdayLow
    const monthNames = cap === true ? monthNamesCap:monthNamesLow


    const output = timeincluded === true ?
        weekday[tzDate.getDay()] + " " + tzDate.getDate() + " " + monthNames[tzDate.getMonth()] + " • " + ampm :
        weekday[tzDate.getDay()] + " " + tzDate.getDate() + " " + monthNames[tzDate.getMonth()]



    // const dateString = tzDate.split('-')[0].split(" ")
    // if (mini == true) {
    //     return (dateString[2] + " " + dateString[1])
    // }

    return (output+ " GMT")
    // return (output.replace(":00", "").replace(" 0", " ")
    // )
    // return (dateString[0] + " " + dateString[2] + " " + dateString[1])
}



export default dateToTile;