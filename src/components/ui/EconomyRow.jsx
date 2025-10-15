import React, {useState} from "react";
import "../../utils.js"

export default function EconomyRow({row, rowNumber, selected, setSelected}) {
    const [hovered, setHovered] = useState("")
    let y
    let yA
    let yB
    let yC
    if (rowNumber > 28) {
        y = 1042 + (44 * (rowNumber - 6))
        yA = 1060 + (44 * (rowNumber - 6))
        yB = 1066 + (44 * (rowNumber - 6))
        yC = 1057 + (44 * (rowNumber - 6))
    } else if (rowNumber > 18) {
        y = 1020 + (44 * (rowNumber - 6))
        yA = 1038 + (44 * (rowNumber - 6))
        yB = 1044 + (44 * (rowNumber - 6))
        yC = 1035 + (44 * (rowNumber - 6))
    } else if (rowNumber > 13) {
        y = 998 + (44 * (rowNumber - 6))
        yA = 1016 + (44 * (rowNumber - 6))
        yB = 1022 + (44 * (rowNumber - 6))
        yC = 1013 + (44 * (rowNumber - 6))
    } else {
        y = 976 + (44 * (rowNumber - 6))
        yA = 994 + (44 * (rowNumber - 6))
        yB = 1000 + (44 * (rowNumber - 6))
        yC = 991 + (44 * (rowNumber - 6))
    }

    let xRowNum
    if (rowNumber > 9) {
        xRowNum = 1205
    } else {
        xRowNum = 1209
    }
    let yRowNum
    if (rowNumber > 28) {
        yRowNum = 1064 + (44 * (rowNumber - 6))
    } else if (rowNumber > 18) {
        yRowNum = 1042 + (44 * (rowNumber - 6))
    } else if (rowNumber > 13) {
        yRowNum = 1020 + (44 * (rowNumber - 6))
    } else {
        yRowNum = 998 + (44 * (rowNumber - 6))
    }
    const seatsData = [
        {
            index: 0,
            x: 1117,
            xA: 1120,
            xB: 1126,
            xC: 1135
        },
        {
            index: 1,
            x: 1144,
            xA: 1147,
            xB: 1153,
            xC: 1162
        },
        {
            index: 2,
            x: 1171,
            xA: 1174,
            xB: 1180,
            xC: 1189
        },
        {
            index: 3,
            x: 1233,
            xA: 1236,
            xB: 1242,
            xC: 1251
        },
        {
            index: 4,
            x: 1260,
            xA: 1263,
            xB: 1269,
            xC: 1278
        },
        {
            index: 5,
            x: 1287,
            xA: 1290,
            xB: 1296,
            xC: 1305
        }
    ]
    return (
        <>
            {seatsData.map(seat => (
                <>
                    {hovered === row[seat.index].id ? <title>{row[seat.index].price}</title> : null}
                    <svg onClick={() => {
                        if (!row[seat.index].occupied) setSelected(prev => [...prev, row[seat.index].id])
                        if (selected.contains(row[seat.index].id)) setSelected([])
                    }}
                         onMouseEnter={() => {
                             if (!selected.contains(row[seat.index].id)) setHovered(row[seat.index].id)
                         }}
                         onMouseLeave={() => setHovered("")}
                         className="cursor-pointer"
                    >
                        <rect width={22} height={32} x={seat.x} y={y}
                              fill={row[seat.index].occupied ? "#E9E8FC" : (hovered === row[seat.index].id && !selected.contains(row[seat.index].id)) ? "#1513A0" : selected.contains(row[seat.index].id) ? "#EB568C" : "#605DEC"}
                              rx={4}/>
                        {selected.contains(row[seat.index].id) ?
                            <polyline stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                      fill="none"
                                      points={`${seat.xA},${yA} ${seat.xB},${yB} ${seat.xC},${yC}`}/>
                            : null}
                    </svg>
                    {seat.index === 2 ? <text x={xRowNum} y={yRowNum} fill="#7C8DB0">{rowNumber}</text> : null}
                </>
            ))}
        </>
    )
}