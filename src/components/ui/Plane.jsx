import React from "react";
import SeatRow from "./SeatRow.jsx";

export default function Plane({seatsArray, selected, setSelected}) {
    const passengerCount = 1
    return (
        <>
            {
                seatsArray.map((row, index) => <SeatRow row={row} rowNumber={index + 1} selected={selected} setSelected={setSelected} />)
            }
        </>
    )
}