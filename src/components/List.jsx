export default function List({options, onMouseEnter, onMouseLeave, onClick, width}) {
    return (
        <ul onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
            style={{width: `${width}px`}}
            className="max-h-80 overflow-y-scroll bg-white rounded-md ring-2 ring-gray-300 shadow-md p-4 text-lg">
            {options.map(option => (
                <li onClick={() => onClick(option)} className="hover:bg-violet-500 hover:text-violet-50 hover:rounded-sm hover:cursor-pointer px-4 py-2">{option}</li>
            ))}
        </ul>
    )
}