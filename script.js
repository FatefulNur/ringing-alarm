const options = document.querySelector(".options"),
    optionHour = document.getElementById("hour-option"),
    optionMinute = document.getElementById("minute-option"),
    optionAmPm = document.getElementById("ampm-option"),
    clockHour = document.getElementById("hour"),
    clockMinute = document.getElementById("minute"),
    clockSecond = document.getElementById("second"),
    clockAmPm = document.getElementById("ampm"),
    select = document.querySelectorAll("select"),
    button = document.querySelector("button")

// Inserting hour option in select box
for (let i = 12; i > 0; i--) {
    let hour = i < 10 ? `0${i}` : i
    hour = `<option>${hour}</option>`
    optionHour.insertAdjacentHTML("afterbegin", hour)
}

// Inserting minute option in select box
for (let i = 59; i > 0; i--) {
    let minute = i < 10 ? `0${i}` : i
    minute = `<option>${minute}</option>`
    optionMinute.insertAdjacentHTML("afterbegin", minute)
}

// Inserting AM/PM option in select box
for (let i = 2; i > 0; i--) {
    let ampm = (i == 1) ? "AM" : "PM"
    let amPm = `<option>${ampm}</option>`
    optionAmPm.insertAdjacentHTML("afterbegin", amPm)
}

let alarmTime,
    isSetAlarm = false,
    audio = new Audio('./audio/alarm.mp3')

// Loading time and Alarm ring
const loadTime = () => {
    let time = new Date(),
        hr = time.getHours(),
        min = time.getMinutes(),
        sec = time.getSeconds(),
        ampm = "AM"

    if (hr > 12) {
        hr = hr - 12
        ampm = "PM"
    }
    hr = (hr == 0) ? 12 : hr

    hr = (hr < 10) ? `0${hr}` : hr
    min = (min < 10) ? `0${min}` : min
    sec = (sec < 10) ? `0${sec}` : sec

    clockHour.innerText = `${hr}`
    clockMinute.innerText = `${min}`
    clockSecond.innerText = `${sec}`
    clockAmPm.innerText = `${ampm}`

    if (alarmTime == `${hr}:${min}:${ampm}`) {
        audio.play()
        audio.loop = true
    }
}
setInterval(loadTime, 1000)

// Toggle alarm by clicking button
const setAlarm = () => {
    if (isSetAlarm) {
        audio.pause()
        alarmTime = null
        select[0].classList.remove("disabled")
        select[1].classList.remove("disabled")
        select[2].classList.remove("disabled")
        button.innerText = `Set Alarm`
        return isSetAlarm = false
    }

    if (select[0].value == "Hour" || select[1].value == "Minute" || select[2].value == "AM/PM") {
        return alert("Please select a time to set alarm")
    }

    isSetAlarm = true
    alarmTime = `${select[0].value}:${select[1].value}:${select[2].value}`
    select[0].classList.add("disabled")
    select[1].classList.add("disabled")
    select[2].classList.add("disabled")
    button.innerText = `Clear Alarm`
}

button.addEventListener("click", setAlarm);