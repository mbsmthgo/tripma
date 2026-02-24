import {useLocation, useNavigate} from "react-router";
import Button from "../components/Button.jsx";
import SvgPlaneSeats from "../components/SvgPlaneSeats.jsx";
import seats from "../assets/seats.json";
import {useState} from "react";
import {nanoid} from "nanoid";
import FlightInfo from "../components/FlightInfo.jsx";

export default function SelectSeats() {
    const [selected, setSelected] = useState([])
    const [selectedOneWay, setSelectedOneWay] = useState([])

    function seatCategoryCheck(seat) {
        if (seat?.includes("A") || seat?.includes("F") ||
            (seat?.slice(0, -1).match(/^[1-5]$/) && seat?.includes("D"))) {
            return "window"
        } else if (seat?.slice(0, -1).match(/^[1-5]$/) && seat?.includes("B")) {
            return "aisle"
        } else if (seat?.includes("B") || seat?.includes("E")) {
            return "middle"
        }
        return "aisle"
    }

    function seatClassCheck(seat) {
        if (seat?.slice(0, -1).match(/^[1-5]$/)) {
            return "business"
        }
        return "economy"
    }

    function refreshData() {
        setSelectedOneWay(selected)
        setSelected([])
    }

    const navigate = useNavigate()

    const location = useLocation()
    const passengerCount = location.state?.passengerCount
    const stateObj = {
        ...location.state,
        selected: selectedOneWay.concat(selected),
        seatCategory: selectedOneWay.map(seat => seatCategoryCheck(seat)).concat(selected.map(seat => seatCategoryCheck(seat))),
        seatClass: selectedOneWay.map(seat => seatClassCheck(seat)).concat(selected.map(seat => seatClassCheck(seat)))
    }

    const eFeatures = [
        "Built-in entertainment system",
        "Complimentary snacks and drinks",
        "One free carry-on and personal item"
    ]
    const bFeatures = [
        "Extended leg room",
        "First two checked bags free",
        "Priority boarding",
        "Personalized service",
        "Enhanced food and drink service",
        "Seats that recline 40% more than economy"
    ]
    const seatClass = [
        {
            name: "Economy",
            image: "src/assets/e-seats.svg",
            description: "Economy class offers functional seating with essential comforts for an efficient and budget-conscious journey",
            divider: "src/assets/divider-p.svg",
            marker: "list-image-[url(src/assets/dot.svg)]",
            features: eFeatures
        },
        {
            name: "Business class",
            image: "src/assets/b-seats.svg",
            description: "Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service",
            divider: "src/assets/divider-g.svg",
            marker: "list-image-[url(src/assets/checkmark.svg)]",
            features: bFeatures
        }
    ]
    return (
        <div className="flex h-[110vh]">
            <div className="plane-scrollbar w-1/2 overflow-x-hidden overflow-y-scroll border-r-2 border-gray-200">
                <div className="-ml-170 mt-20 scale-120">
                    <SvgPlaneSeats seatsArray={seats} selected={selected} setSelected={setSelected}
                                   passengerCount={passengerCount}/>
                </div>
            </div>
            <div className="w-1/2">
                {selectedOneWay.length === passengerCount ? <FlightInfo flightType="Arriving"
                    origin={location.state?.from} destination={location.state?.to} date={location.state?.when.slice(-6)}
                    depTime={location.state?.chosenTicket?.[1]?.departure} arrTime={location.state?.chosenTicket?.[1]?.arrival}/> :
                <FlightInfo origin={location.state?.from} destination={location.state?.to} date={location.state?.when.slice(0, 6)}
                            depTime={location.state?.chosenTicket?.[0]?.departure}
                            arrTime={location.state?.chosenTicket?.[0]?.arrival}
                            flightType="Departing"/>}
                <div className="px-10 flex justify-center gap-16">
                    {seatClass.map(sClass =>
                        <div className="mt-20 flex flex-col" key={nanoid()}>
                            <img src={sClass.image} alt={`${sClass.name} Seats`} className="w-[500px]"/>
                            <div className="flex flex-col gap-7 p-10">
                                <h2 className="mt-5 text-3xl tracking-normal text-gray-600">{sClass.name}</h2>
                                <p className="text-xl text-gray-400">{sClass.description}</p>
                                <img src={sClass.divider} alt="Divider" className="w-16"/>
                                <ul className="flex flex-col gap-5 text-xl text-gray-500 pl-6">
                                    {sClass.features.map(feature =>
                                        <li key={nanoid()} className={`${sClass.marker} list-inside`}> {feature}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-20 w-full min-h-[250px] bg-gray-50 border-t-2 border-gray-200 flex flex-col pt-4">
                    {location.state?.passengerInfo.map((passenger, index) =>
                        <div key={index} className="flex">
                            <div className="min-w-1/3 w-auto px-10 py-5 flex flex-col gap-2">
                                <p className="text-xl text-gray-400">Passenger {index + 1}</p>
                                <p className="text-3xl tracking-normal text-gray-600">{passenger.name} {passenger.surname}</p>
                            </div>
                            <div className="px-10 py-5 flex flex-col gap-2">
                                <p className="text-xl text-gray-400">Seat number</p>
                                <p className="text-3xl tracking-normal text-gray-600">{selected.length !== 0 ? selected[index] : "--"}</p>
                            </div>
                        </div>)}

                    <div className="px-10 py-5 flex items-center gap-5">
                        {location.state?.chosenTicket?.[1]?.duration !== "0h 0m" ?
                            <Button variant="secondary" navigation={() => refreshData()}
                            type={stateObj.selected.length === passengerCount * 2 ? "inactive" : ""}>Save and
                                continue</Button> : null}
                        <Button type={((stateObj.selected.length === passengerCount) && (stateObj.chosenTicket?.[1]?.duration === "0h 0m")) || ((stateObj.selected.length === passengerCount * 2) && (stateObj.chosenTicket?.[1]?.duration !== "0h 0m")) ? "" : "inactive"}
                                navigation={() => navigate("/payment", {
                                    state: {stateObj}
                                })}>Payment Method</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}