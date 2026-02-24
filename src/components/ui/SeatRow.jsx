import BusinessRow from "./BusinessRow.jsx";
import EconomyRow from "./EconomyRow.jsx";
import React from "react";
import Exit from "./Exit.jsx";

export default function SeatRow({row, rowNumber, selected, setSelected, passengerCount}) {



    if (rowNumber < 6) {
        return (
            <>
                {rowNumber === 1 ? <rect width={200} height={312} x={1113} y={614} fill="#fff" rx={8}/> : null}
                <BusinessRow row={row} rowNumber={rowNumber} selected={selected} setSelected={setSelected} passengerCount={passengerCount} />
            </>
        )
    } else {
        return (
            <>
                {rowNumber === 6 ? (
                    <>
                        <rect width={200} height={1332} x={1113} y={942} fill="#fff" rx={8}/>
                        <Exit index={0}/>
                    </>
                ) : null}
                {rowNumber === 14 ? <Exit index={1}/> : null}
                {rowNumber === 19 ? <Exit index={2}/> : null}
                {rowNumber === 29 ? <Exit index={3}/> : null}
                <EconomyRow row={row} rowNumber={rowNumber} selected={selected} setSelected={setSelected} passengerCount={passengerCount} />
            </>
        )
    }
}