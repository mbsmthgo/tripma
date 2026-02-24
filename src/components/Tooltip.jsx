export default function Tooltip({children, variant, color}) {
    return (
        <div className="tooltip" data-variant={variant} data-color={color}>
            <p className="tool-text">{children}</p>
        </div>
    )
}