import React from "react";

export default function Exit({index}) {
    let yCircle
    if (index > 2) {
        yCircle = 915 + (374 * index)
    } else if (index > 1) {
        yCircle = 827 + (374 * index)
    }
    else {
        yCircle = 959 + (374 * index)
    }
    let yText
    if (index > 2) {
        yText = 920 + (374 * index)
    } else if (index > 1) {
        yText = 832 + (374 * index)
    } else {
        yText = 964 + (374 * index)
    }
    return (
        <>
            <text className="text-xs tracking-wider" x={1137} y={yText} fill="#7C8DB0">Exit row</text>
            <circle cx={1126} cy={yCircle} r={6} stroke="#7C8DB0" strokeWidth={1.5}/>
            <text className="text-[11px] font-medium" fill="#7C8DB0" fillRule="evenodd" x={1124.5} y={yText}>i
            </text>
        </>
    )
}