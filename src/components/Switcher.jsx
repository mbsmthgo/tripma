import SvgIcon from "./SvgIcon.jsx";

export default function Switcher({options, chosen, setChosen}) {
    return (
        <div
            className="flex gap-4 justify-between items-center text-2xl text-violet-600 border border-violet-500 h-15 rounded-md">
            {options.map(option => (
                <span onClick={() => setChosen(option)}
                    key={option} className={`${chosen === option ? "w-50 h-16 rounded-md bg-violet-500 text-white" : ""} px-4 flex items-center gap-2 w-auto cursor-pointer`}>
                    <SvgIcon iconName={option}/>
                    <p>{option}</p>
                </span>
            ))}
        </div>
    )
}