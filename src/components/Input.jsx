export default function Input({
                                  placeholder = "Placeholder",
                                  icon,
                                  width,
                                  value,
                                  onChange = () => {
                                  },
                                  onFocus = () => {
                                  },
                                  onBlur = () => {
                                  },
                                  type = "text",
                                  readonly,
                                  required,
                                  ref,
                                  pattern
                              }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center relative">
                <input
                    style={{width: `${width}px`}}
                    className={`h-15 bg-white border-2 border-gray-300 rounded-md ${icon ? "pl-15" : "pl-4"} focus:outline-violet-500 text-xl`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                    readOnly={readonly}
                    required={required}
                    ref={ref}
                    pattern={pattern}/>
                {icon ?
                    <div className="absolute left-4">
                        {icon}
                    </div> : null}
            </div>
        </div>
    )
}