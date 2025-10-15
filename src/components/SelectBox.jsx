import Input from "./Input.jsx";
import {useMemo, useState} from "react";

export default function SelectBox({placeholder, icon, readonly, value, onChange, width}) {
    const [focusInput, setFocusInput] = useState(false)
    const [focusList, setFocusList] = useState(false)
    const visible = focusInput || focusList

    const inputValue = useMemo(() => {
        const adultText = value.adults === 1 ? "1 Adult" : value.adults > 1 ? `${value.adults} Adults` : ""
        const minorText = value.minors === 1 ? "1 Minor" : value.minors > 1 ? `${value.minors} Minors` : ""
        if (adultText && minorText) {
            return `${adultText} ${minorText}`
        } else if (adultText) {
            return adultText
        } else if (minorText) {
            return minorText
        } else {
            return ""
        }
    }, [value])

    function handleDecrementAdults() {
        onChange(prev => {
            return {...prev, adults: Math.max(0, prev.adults - 1)}
        })
    }

    function handleIncrementAdults() {
        onChange(prev => {
            return {...prev, adults: prev.adults + 1}
        })
    }

    function handleDecrementMinors() {
        onChange(prev => {
            return {...prev, minors: Math.max(0, prev.minors - 1)}
        })
    }

    function handleIncrementMinors() {
        onChange(prev => {
            return {...prev, minors: prev.minors + 1}
        })
    }

    return (
        <div className="flex flex-col items-end w-[300px] h-[200px]">
            <Input
                icon={icon}
                placeholder={placeholder}
                readonly={readonly}
                width={width}
                value={inputValue}
                onFocus={() => setFocusInput(true)}
                onBlur={() => setFocusInput(false)}
            />
            {visible ?
                <div onMouseEnter={() => setFocusList(true)}
                     onMouseLeave={() => setFocusList(false)}
                     style={{width: `${width}px`}}
                     className="bg-white rounded-md ring-2 ring-gray-300 shadow-md p-4 text-lg flex flex-col gap-4 text-gray-500">
                    <div className="flex flex-row justify-between items-center">
                        <p>Adults:</p>
                        <div className="flex flex-row justify-center items-center gap-6">
                            <img onClick={handleDecrementAdults}
                                 onMouseDown={e => e.preventDefault()}
                                 src="src/assets/minus.svg" alt="Minus Icon" className="cursor-pointer w-5 h-5"/>
                            <p className="text-xl">{value.adults}</p>
                            <img onClick={handleIncrementAdults}
                                 onMouseDown={e => e.preventDefault()}
                                 src="src/assets/plus.svg" alt="Plus Icon" className="cursor-pointer w-5 h-5"/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <p>Minors:</p>
                        <div className="flex flex-row justify-center items-center gap-6">
                            <img onClick={handleDecrementMinors}
                                 onMouseDown={e => e.preventDefault()}
                                 src="src/assets/minus.svg" alt="Minus Icon" className="cursor-pointer w-5 h-5"/>
                            <p className="text-xl">{value.minors}</p>
                            <img onClick={handleIncrementMinors}
                                 onMouseDown={e => e.preventDefault()}
                                 src="src/assets/plus.svg" alt="Plus Icon" className="cursor-pointer w-5 h-5"/>
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}