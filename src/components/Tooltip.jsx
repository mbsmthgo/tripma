import React from "react";
import { RxCross2 } from "react-icons/rx";


export default function Tooltip({title, icon, children, variant, color}) {
    const [open, setOpen] = React.useState(true);
    function hide() {
        setOpen(false);
    }

    return (
        <>
            {open ?
                <div className="tooltip" data-variant={variant} data-color={color}>
                    <span className="tool-icon">{icon}</span>
                    <div className="tool-info">
                        <h3 className="tool-title">{title}</h3>
                        <p className="tool-text">{children}</p>
                    </div>
                    <span className="tool-cross" onClick={hide}><RxCross2/></span>
                </div> : null}
        </>
    )
}