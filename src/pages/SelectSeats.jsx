import {useLocation} from "react-router";
import Button from "../components/Button.jsx";
import SvgPlaneSeats from "../components/SvgPlaneSeats.jsx";
import seats from "../assets/seats.json";
import {useState} from "react";

export default function SelectSeats() {
    const [selected, setSelected] = useState([]);
    const location = useLocation()
    console.log(location.state)
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
                    <SvgPlaneSeats seatsArray={seats} selected={selected} setSelected={setSelected} />
                </div>

            </div>
            <div className="w-1/2">
                <div className="flex items-center w-full h-[125px] bg-gray-800 text-white">
                    <div className="px-10 w-[500px] flex items-center justify-between">
                        <p className="text-4xl font-semibold">{location.state.from}</p>
                        <img src="src/assets/arrow-trip.svg" alt="Arrow Icon" className="size-8"/>
                        <p className="text-4xl font-semibold">{location.state.to}</p>
                    </div>
                    <div className="px-10 bg-violet-500 h-full w-1/3 flex flex-col justify-center">
                        <p className="flex gap-2 text-2xl">{location.state.when} <p
                            className="font-light opacity-50">|</p> {location.state.timeFrom}</p>
                        <p className="text-lg font-light">Departing</p>
                    </div>
                    <div className="px-10 w-1/3 flex flex-col justify-center">
                        <p className="text-2xl">{location.state.timeTo}</p>
                        <p className="text-lg font-light">Arriving</p>
                    </div>
                </div>
                <div className="px-10 flex justify-center gap-16">
                    {seatClass.map(sClass =>
                        <div className="mt-20 flex flex-col">
                            <img src={sClass.image} alt={`${sClass.name} Seats`} className="w-[500px]"/>
                            <div className="flex flex-col gap-7 p-10">
                                <h2 className="mt-5 text-3xl tracking-normal text-gray-600">{sClass.name}</h2>
                                <p className="text-xl text-gray-400">{sClass.description}</p>
                                <img src={sClass.divider} alt="Divider" className="w-16"/>
                                <ul className="flex flex-col gap-5 text-xl text-gray-500 pl-6">
                                    {sClass.features.map(feature =>
                                        <li className={`${sClass.marker} list-inside`}> {feature}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className="mt-20 w-full h-[170px] bg-gray-50 border-t-2 border-gray-200 flex items-center justify-between">
                    <div className="px-10 py-5 flex flex-col gap-2">
                        <p className="text-xl text-gray-400">Passenger 1</p>
                        <p className="text-3xl tracking-normal text-gray-600">{location.state.name} {location.state.surname}</p>
                    </div>
                    <div className="px-10 py-5 flex flex-col gap-2">
                        <p className="text-xl text-gray-400">Seat number</p>
                        <p className="text-3xl tracking-normal text-gray-600">{selected.length !== 0 ? selected : "--"}</p>
                    </div>
                    <div className="px-10 py-5 flex items-center gap-5">
                        <Button variant="secondary">Save and close</Button>
                        <Button type="inactive">Next flight</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}