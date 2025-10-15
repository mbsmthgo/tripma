import React, {useState} from "react";
import Input from "./Input.jsx";
import List from "./List.jsx";


export default function Combobox({value, onChange, options, icon, placeholder, width, setOpen = () => {}}) {
    const [focusInput, setFocusInput] = useState(false)
    const [focusList, setFocusList] = useState(false)
    const visible = focusInput || focusList
    return (
        <div className="flex flex-col items-end w-[400px] h-[200px]">
            <Input
                placeholder={placeholder}
                icon={icon}
                width={width}
                value={value}
                onChange={newValue => onChange(newValue)}
                onFocus={() => {
                    setFocusInput(true)
                    setOpen(true)
                }}
                onBlur={() => {
                    setFocusInput(false)
                    setOpen(false)
                }}
            />
            {visible ?
                <List onMouseEnter={() => setFocusList(true)}
                      onMouseLeave={() => setFocusList(false)}
                      onClick={(option) => {
                          setFocusList(false)
                          onChange(option)
                      }}
                      options={options}
                      width={width}
                /> : null}
        </div>
    )
}