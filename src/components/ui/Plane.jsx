import React from "react";
import SeatRow from "./SeatRow.jsx";
import {nanoid} from "nanoid";

export default function Plane({seatsArray, selected, setSelected, passengerCount}) {
    return (
        <>
            {
                seatsArray.map((row, index) => <SeatRow key={nanoid()} row={row} rowNumber={index + 1} selected={selected} setSelected={setSelected} passengerCount={passengerCount} />)
            }
        </>
    )
}