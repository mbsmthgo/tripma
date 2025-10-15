import {useState} from "react";

export default function CompoundPill({children, component}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex flex-col h-[50px]">
            <button onClick={() => setOpen(prev => !prev)}
                    className="flex items-center gap-5 w-80 rounded-sm p-3 text-xl text-left border-2 border-gray-200 hover:border-gray-500 focus:border-violet-500">
                {children}
                <img src="src/assets/arrow.svg" alt="Arrow Icon" className="size-3"/>
            </button>
            {open ? component
                : null}
        </div>
    )
}