import {useState} from "react";

export default function Slider() {
    const [range, setRange] = useState(0)
    function handleRange(event) {
        setRange(event.target.value)
    }
    return (
        <div className="flex flex-col w-80 rounded-sm border-2 border-gray-200 bg-white shadow-sm pt-6 px-4 pb-4 text-xl">
            <div className="flex justify-between">
                <label htmlFor="price">Price</label>
                <span>{range}</span>
            </div>
            <input type="range" min="0" max="100" step="1" id="price" value={range}
                   onChange={handleRange} className="accent-violet-500 cursor-pointer"/>
        </div>
    )
}