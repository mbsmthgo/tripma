import classNames from "classnames";

export default function Button({children="Button", variant="primary", size="lg", type, navigation, disabled}) {
    const defaultStyle = "rounded-sm py-4"
    const sizeStyles = {
        "lg": "min-w-30 w-auto text-xl px-6",
        "md": "w-25 text-xl px-6",
        "sm": "w-20 text-lg px-5",
        "extra": "w-15 text-lg px-5"
    }
    const variantStyles = {
        "primary": "bg-violet-500 text-violet-50 hover:bg-violet-600 cursor-pointer",
        "secondary": "bg-white text-violet-500 border-2 border-violet-500 hover:bg-violet-100 cursor-pointer",
        "tertiary": "bg-transparent text-violet-500 hover:text-violet-700 hover:font-medium cursor-pointer"
    }
    const inactiveTypeStyles = {
        "primary": "bg-gray-100 text-gray-400 border-2 border-gray-400",
        "secondary": "bg-white text-gray-400 border-2 border-gray-400",
        "tertiary": "bg-transparent text-gray-400"
    }
    const destructiveStyles = {
        "primary": "bg-red-400 text-white",
        "secondary": "bg-white text-red-400 border-2 border-red-400",
        "tertiary": "bg-transparent text-red-400"
    }
    const typeStyles = {
        "inactive": inactiveTypeStyles[variant],
        "destructive": destructiveStyles[variant]
    }
    const buttonStyles = classNames(defaultStyle, sizeStyles[size], type ? typeStyles[type] : variantStyles[variant]);
    return (
        <button onClick={navigation} className={buttonStyles} disabled={disabled}>{children}</button>
    )
}