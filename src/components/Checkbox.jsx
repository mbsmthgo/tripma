import {useState} from "react";

export default function Checkbox({options}) {
    const [picks, setPicks] = useState([])

    function handlePickChange(event) {
        const {checked, name} = event.currentTarget
        if (checked) {
            setPicks((oldPicks) => [...oldPicks, name])
        } else {
            setPicks((oldPicks) => oldPicks.filter((item) => item !== name))
        }
    }

    return (
        <div className="flex flex-col gap-4 w-80 rounded-sm border-2 border-gray-200 bg-white shadow-sm pt-6 px-4 pb-4 text-xl">
            {options.map(option => (
                    <div className="flex gap-3 items-center">
                        <input id={option} type="checkbox" name={option}
                               onChange={handlePickChange}
                               className={`accent-violet-500 appearance-none size-5 rounded-sm border-2 border-gray-400 cursor-pointer
                               ${picks.includes(option) ? "before:block before:size-3 before:rounded-xs before:mx-0.5 before:my-0.5 before:bg-violet-500" : ""}`}/>
                        <label htmlFor={option}>{option}</label>
                    </div>
                )
            )}
        </div>
    )
}