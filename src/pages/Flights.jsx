import Search from "../components/ui/Search.jsx";
import {useLocation} from "react-router";
import CompoundPill from "../components/CompoundPill.jsx";
import Slider from "../components/Slider.jsx";
import Checkbox from "../components/Checkbox.jsx";
import {useEffect, useState} from "react";
import {nanoid} from 'nanoid'
import Button from "../components/Button.jsx";
import PassengerInfo from "../components/ui/PassengerInfo.jsx";

export default function Flights() {
    const location = useLocation()
    const depIata = location.state?.from.slice(-4, -1)
    const arrIata = location.state?.to.slice(-4, -1)
    const depDate = (location.state?.date?.from && location.state?.date?.to) ? location.state?.date?.from.toISOString().split("T")[0] : location.state?.date.toISOString().split("T")[0]
    const arrDate = (location.state?.date?.from && location.state?.date?.to) ? location.state?.date?.to.toISOString().split("T")[0] : ""
    const way = !arrDate

    const [apiTicketsData, setApiTicketsData] = useState([])
    const [chosenTicket, setChosenTicket] = useState()
    const [pasInfo, setPasInfo] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        fetch(`/api/aviasales/v3/prices_for_dates?origin=${depIata}&destination=${arrIata}&departure_at=${depDate}&return_at=${arrDate}&sorting=price&currency=rub&limit=10&page=1&one_way=${way}&token=da52831873cc52b203e0ea191cabd6ad`)
            .then(res => res.json())
            .then(data => setApiTicketsData(data.data))
    }, [arrIata, depIata, depDate, arrDate, way])

    const [open, setOpen] = useState(false)

    function convertTime(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`
    }

    function toDateObj(ticketTime) {
        const dateObj = new Date(ticketTime)
        return dateObj.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})
    }

    function countArrival(ticketDeparture, ticketDuration) {
        let ticketArrival = new Date(ticketDeparture)
        ticketArrival.setMinutes(ticketArrival.getMinutes() + ticketDuration)
        ticketArrival = toDateObj(ticketArrival)
        return ticketArrival
    }

    const initialDate = (location.state?.date?.from && location.state?.date?.to) ?
        (location.state?.date?.from.toLocaleString("en-US", {
            month: "short",
            day: "numeric"
        }) + " - " + location.state?.date?.to.toLocaleString("en-US", {
            month: "short",
            day: "numeric"
        })) : location.state?.date.toLocaleString("en-US", {
            month: "short",
            day: "numeric"
        })

    return (
        <div className="-mt-10 mx-20">
            {pasInfo ?
                <div className="flex items-end justify-between mb-20">
                    <PassengerInfo setSuccess={setSuccess} success={success} from={depIata} to={arrIata} when={initialDate} timeFrom={chosenTicket.departure} timeTo={chosenTicket.arrival}/>
                    <img src="src/assets/luggage.svg" alt="Luggage Restrictions"/>
                </div>
                :
                <>
                    <div className={`h-[100px] relative ${open ? "z-10" : "z-0"}`}>
                        <Search initialDeparture={depIata}
                                initialArrival={arrIata}
                                initialDate={initialDate}
                                initialPassenger={location.state?.passenger}
                                setOpen={setOpen}/>
                    </div>
                    <div className="flex gap-7 relative z-10">
                        <CompoundPill component={<Slider/>}>Max price</CompoundPill>
                        <CompoundPill
                            component={<Checkbox
                                options={["Economy", "Premium economy", "Business", "First class"]}/>}>Seat
                            class</CompoundPill>
                    </div>
                    <h2 className="mt-15 text-2xl mb-7 relative z-0">Choose a <span
                        className="text-violet-600 font-medium">departing</span> flight</h2>
                    <div className="flex justify-between">
                        <div
                            className="flex flex-col items-center shrink-0 w-[1400px] h-fit max-h-[700px] ring-2 ring-gray-200 rounded-2xl overflow-y-scroll relative z-0">
                            {apiTicketsData ? apiTicketsData.map(ticket => {
                                    const id = nanoid()
                                    return (
                                        <div onClick={() => setChosenTicket({
                                            airline: ticket.airline,
                                            flight: ticket.flight_number,
                                            duration: convertTime(ticket.duration),
                                            departure: toDateObj(ticket.departure_at),
                                            arrival: countArrival(ticket.departure_at, ticket.duration_to),
                                            stops: ticket.transfers,
                                            price: ticket.price
                                        })}
                                             key={id} id={id}
                                             className="flex items-start gap-50 w-[1360px] h-[120px] border-b-2 border-b-gray-200 last:border-none px-10 py-7 text-xl cursor-pointer">
                                            <div className="flex">
                                                <img src={`https://pics.avs.io/100/100/${ticket.airline}.png`}
                                                     alt="Airlines Icon"/>
                                                <div className="flex flex-col gap-2 ml-7 w-[200px]">
                                                    <p>{convertTime(ticket.duration)}</p>
                                                    <p className="text-gray-400">{ticket.airline}</p>
                                                </div>
                                            </div>
                                            <p className="-ml-20">{toDateObj(ticket.departure_at)} - {countArrival(ticket.departure_at, ticket.duration_to)}</p>
                                            <p className="w-[100px]">{ticket.transfers > 0 ? `${ticket.transfers} stop` : "Nonstop"}</p>
                                            <p>{ticket.price}</p>
                                        </div>
                                    )
                                }
                            ) : <h1>Loading...</h1>}
                        </div>
                    </div>
                </>
            }
            <>
            {chosenTicket || pasInfo ?
                <div className="flex flex-col items-end gap-7 absolute top-132.5 right-20">
                    <div className="w-[600px] h-[150px] ring-2 ring-gray-200 bg-white rounded-xl shrink-0">
                        <div className="flex items-start gap-10 p-7 text-xl ">
                            <img src={`https://pics.avs.io/100/100/${chosenTicket.airline}.png`}
                                 alt="Airlines Icon"/>
                            <div className="flex flex-col gap-1 -ml-3 w-[200px]">
                                <p>{chosenTicket.airline}</p>
                                <p className="text-gray-400">{chosenTicket.flight}</p>
                            </div>
                            <div className="flex flex-col gap-1 text-center w-[200px]">
                                <p>{chosenTicket.duration}</p>
                                <p>{chosenTicket.departure} - {chosenTicket.arrival}</p>
                                <p className="text-gray-400">{chosenTicket.stops > 0 ? `${chosenTicket.stops} stop` : "Nonstop"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-xl font-medium">
                        <p className="flex gap-12">Subtotal <span>{chosenTicket.price - 1000}</span></p>
                        <p className="flex gap-12">Taxes and Fees <span>1000</span></p>
                        <p className="flex gap-12">Total <span>{chosenTicket.price}</span></p>
                    </div>
                    <Button type={pasInfo && !success ? "inactive" : ""}
                        navigation={() => setPasInfo(true)}>{pasInfo ? "Select seats" : "Passenger information"}</Button>
                </div> : null}
            </>
        </div>
    )
}
