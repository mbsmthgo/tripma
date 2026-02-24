import React, {useState} from "react";
import "../../utils.js"


export default function BusinessRow({row, rowNumber, selected, setSelected, passengerCount}) {

    const [hovered, setHovered] = useState("")
    const y = 630 + (60 * (rowNumber - 1))
    const yRowNum = 655 + (60 * (rowNumber - 1))

    const yA = 650 + (60 * (rowNumber - 1))
    const yB = 660 + (60 * (rowNumber - 1))
    const yC = 645 + (60 * (rowNumber - 1))

    const seatsData = [
        {
            index: 0,
            x: 1121,
            xA: 1127,
            xB: 1135,
            xC: 1145
        },
        {
            index: 1,
            x: 1159.5,
            xA: 1165.5,
            xB: 1173.5,
            xC: 1183.5
        },
        {
            index: 2,
            x: 1236.5,
            xA: 1242.5,
            xB: 1250.5,
            xC: 1260.5
        },
        {
            index: 3,
            x: 1275,
            xA: 1281,
            xB: 1289,
            xC: 1299
        }
    ]

    return (
        <>
            {seatsData.map(seat => {
                function handleSeatClick() {
                    if (!row[seat.index].occupied && !(selected.contains(row[seat.index].id))) {
                        if (selected.length < passengerCount) {
                            setSelected(prev => [...prev, row[seat.index].id])
                        } else {
                            const newArray = [...selected]
                            newArray.pop()
                            setSelected([...newArray, row[seat.index].id])
                        }
                    } else if (selected.contains(row[seat.index].id)) {
                        const index = selected.indexOf(row[seat.index].id)
                        const newArray = [...selected]
                        setSelected(newArray.toSpliced(index, 1))
                    }
                }
                return (
                <>
                    {hovered === row[seat.index].id ? <title>{row[seat.index].price}</title> : null}
                    <svg onClick={() => handleSeatClick()}
                         onMouseEnter={() => {
                             if (!selected.contains(row[seat.index].id)) setHovered(row[seat.index].id)
                         }}
                         onMouseLeave={() => setHovered("")}
                         className="cursor-pointer"
                    >
                        <rect width={30} height={40} x={seat.x} y={y}
                              fill={row[seat.index].occupied ? "#E9E8FC" : (hovered === row[seat.index].id && !selected.contains(row[seat.index].id)) ? "#009B7F" : selected.contains(row[seat.index].id) ? "#EB568C" : "#5CD6C0"}
                              rx={4}/>

                        {selected.contains(row[seat.index].id) ?
                            <polyline stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                      fill="none"
                                      points={`${seat.xA},${yA} ${seat.xB},${yB} ${seat.xC},${yC}`}/>
                            : null}
                    </svg>
                    {seat.index === 1 ? <text x={1209} y={yRowNum} fill="#7C8DB0">{rowNumber}</text> : null}
                </>
            )})}
        </>
    )
}
