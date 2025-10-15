import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import {useMemo, useState} from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

export default function MyDayPicker({placeholder, icon, readonly, width, value, onChange}) {
    const [calendar, setCalendar] = useState("single")

    const [focusInput, setFocusInput] = useState(false)
    const [focusCalendar, setFocusCalendar] = useState(false)
    const visible = focusInput || focusCalendar

    const monthCaptionStyle = {
        fontWeight: 500,
        fontSize: 17
    }

    const validDate = useMemo(() => {
        const options = {
            month: "short",
            day: "numeric"
        }
        if (calendar === "range" && (!value || !value.from || !value.to)) {
            return "Select date range"
        } else if (calendar === "single" && !value) {
            return "Select date"
        }
        let fromStr
        if (calendar === "range") {
            fromStr = value.from.toLocaleString("en-US", options)
        } else if (calendar === "single") {
            fromStr = value.toLocaleString("en-US", options)
        }
        let toStr
        if (value.to) {
            toStr = value.to.toLocaleString("en-US", options)
            return `${fromStr} - ${toStr}`
        }
        return `${fromStr}`
    }, [value, calendar])

    function handleChange(event) {
        setCalendar(event.target.value)
        if (event.target.value === "range") {
            onChange({from: new Date(), to: new Date()})
        } else onChange(new Date())
    }

    return (
        <div className="flex flex-col items-center w-[350px] h-[200px] relative">
            <Input placeholder={placeholder} icon={icon} readonly={readonly} width={width} value={validDate}
                   onFocus={() => setFocusInput(true)} onBlur={() => setFocusInput(false)}
            />
            {visible ?
                <div onMouseEnter={() => setFocusCalendar(true)}
                     className="flex flex-col items-center w-[800px] bg-white z-10 rounded-2xl ring-2 ring-gray-300 shadow-md absolute -top-5">
                    <header className="flex justify-between items-center w-full border-b-2 border-gray-100 p-5">
                        <div className="flex gap-4 text-xl text-gray-500">
                            <label>
                                <input type="radio" name="trip" value="range" checked={calendar === "range"}
                                       onChange={handleChange} className="accent-violet-500"/> Round
                                trip
                            </label>
                            <label>
                                <input type="radio" name="trip" value="single" checked={calendar === "single"}
                                       onChange={handleChange} className="accent-violet-500"/> One way
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <Input placeholder="Depart - Arrive"
                                   icon={<img src="src/assets/calendar.svg" alt="Calendar Icon"/>}
                                   readonly={readonly}
                                   width="300"
                                   value={validDate}/>
                            <Button size="md" navigation={() => setFocusCalendar(false)}>Done</Button>
                        </div>
                    </header>
                    <DayPicker
                        className="flex justify-center w-[700px] p-6 text-lg"
                        styles={{
                            month_caption: monthCaptionStyle,
                        }}
                        numberOfMonths={2}
                        navLayout="around"
                        fixedWeeks
                        animate
                        mode={calendar === "range" ? "range" : "single"}
                        min={1}
                        disabled={{before: new Date()}}
                        selected={value}
                        onSelect={onChange}
                    />
                </div> : null}
        </div>
    )
}