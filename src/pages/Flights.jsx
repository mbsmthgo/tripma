import Search from "../components/ui/Search.jsx";
import {useLocation} from "react-router";
import CompoundPill from "../components/CompoundPill.jsx";
import Slider from "../components/Slider.jsx";
import Checkbox from "../components/Checkbox.jsx";
import {useEffect, useState} from "react";
import {nanoid} from 'nanoid'
import PassengerInfo from "../components/ui/PassengerInfo.jsx";
import MiniTickets from "../components/ui/MiniTickets.jsx";

export default function Flights() {
    const location = useLocation()

    const depIata = location.state?.from.slice(-4, -1)
    const arrIata = location.state?.to.slice(-4, -1)
    const depDate = (location.state?.date?.from && location.state?.date?.to) ? new Intl.DateTimeFormat("en-CA").format(location.state?.date?.from) : new Intl.DateTimeFormat("en-CA").format(location.state?.date)
    const arrDate = (location.state?.date?.from && location.state?.date?.to) ? new Intl.DateTimeFormat("en-CA").format(location.state?.date?.to) : ""
    const way = !arrDate
    const passengers = {
        adult: location.state?.passenger?.adults,
        minor: location.state?.passenger?.minors
    }

    const [apiTicketsData, setApiTicketsData] = useState([])
    const [chosenTicket, setChosenTicket] = useState()
    const [pasInfo, setPasInfo] = useState(false)
    const [passengerInfo, setPassengerInfo] = useState([])


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

    function toDateObj(ticketTime, ticketTimeZone) {
        const dateObj = new Date(ticketTime)
        const options = {
            hour: "numeric",
            minute: "numeric",
            timeZone: ticketTimeZone
        }
        return new Intl.DateTimeFormat("en-US", options).format(dateObj)
    }

    function countArrival(ticketDeparture, ticketDuration, ticketTimeZone) {
        let ticketArrival = new Date(ticketDeparture)
        ticketArrival.setMinutes(ticketArrival.getMinutes() + ticketDuration)
        ticketArrival = toDateObj(ticketArrival, ticketTimeZone)
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

    function countStops(ticketStops) {
        if (ticketStops > 1) {
            return `${ticketStops} stops`
        } else if (ticketStops === 1) {
            return "1 stop"
        }
        return "Nonstop"
    }

    function countTicketsPrice(ticketPrice, adults, children) {
        return ticketPrice * (adults + children)
    }

    return (
        <div className="-mt-10 mx-20">
            {pasInfo ?
                <div className="flex items-end justify-between mb-20">
                    <PassengerInfo from={depIata} to={arrIata}
                                   when={initialDate}
                        // timeFrom={chosenTicket.departure[0]}
                        // timeTo={chosenTicket.arrival[0]}
                        // airline={chosenTicket?.[0]?.airline} flight={chosenTicket.flight}
                        // duration={chosenTicket.duration[0]}
                        // stops={chosenTicket.stops[0]} price={chosenTicket.price}
                                   chosenTicket={chosenTicket}
                                   passengers={passengers}
                                   passengerInfo={passengerInfo}
                                   setPassengerInfo={setPassengerInfo}
                    />
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
                    <h2 className="mt-15 text-2xl mb-7 relative z-0">Choose the <span
                        className="text-violet-600 font-medium">flight</span></h2>
                    <div className="flex justify-between">
                        <div
                            className="flex flex-col items-center shrink-0 w-[1400px] h-fit max-h-[700px] ring ring-gray-200 rounded-2xl overflow-y-auto relative z-0">
                            {apiTicketsData ? apiTicketsData.map((ticket) => {
                                    const id = nanoid()
                                    let durationTo = convertTime(ticket.duration_to)
                                    let durationFrom = convertTime(ticket.duration_back)
                                    let stops = countStops(ticket.transfers)
                                    let returnStops = countStops(ticket.return_transfers)
                                    let ticketsPrice = countTicketsPrice(ticket.price, location.state?.passenger?.adults, location.state?.passenger?.minors)
                                    let timeZoneFrom = ticket.departure_at.slice(-6)
                                    let timeZoneTo = ticket.return_at && ticket.return_at.slice(-6)
                                    let departureTo = toDateObj(ticket.departure_at, timeZoneFrom)
                                    let departureFrom = ticket.return_at && toDateObj(ticket.return_at, timeZoneTo)
                                    let arrivalTo = countArrival(ticket.departure_at, ticket.duration_to, timeZoneFrom)
                                    let arrivalFrom = ticket.return_at && countArrival(ticket.return_at, ticket.duration_back, timeZoneTo)
                                    return (
                                        <div onClick={() =>
                                            setChosenTicket(
                                                [
                                                    {
                                                        link: ticket.link,
                                                        airline: ticket.airline,
                                                        flight: ticket.flight_number,
                                                        duration: durationTo,
                                                        departure: departureTo,
                                                        arrival: arrivalTo,
                                                        stops: stops,
                                                        price: ticketsPrice
                                                    },
                                                    {
                                                        duration: durationFrom,
                                                        departure: departureFrom,
                                                        arrival: arrivalFrom,
                                                        stops: returnStops
                                                    }
                                                ]
                                            )}
                                             key={id} id={id}
                                             className={`first:mt-4 last:mb-4 flex justify-between items-center gap-30 w-[1360px] h-[120px] border-b border-b-gray-200 last:border-none px-10 text-xl cursor-pointer
                                             ${ticket.link === chosenTicket?.[0]?.link ? "bg-violet-50 ring ring-violet-600 rounded-md" : ""}`}>
                                            <img src={`https://pics.avs.io/100/100/${ticket.airline}.png`}
                                                 alt="Airline Logo" className="size-28 w-30 justify-self-start"/>
                                            <p className="-ml-10 text-gray-400 w-10 text-left">{ticket.airline}</p>
                                            {ticket.duration_back !== 0 ?
                                                <div className="flex flex-col gap-2 w-20 text-left">
                                                    <p>{convertTime(ticket.duration_to)}</p>
                                                    <p>{convertTime(ticket.duration_back)}</p>
                                                </div>
                                                : <p className="w-20 text-left">{convertTime(ticket.duration_to)}</p>}
                                            {ticket.return_at ?
                                                <div className="flex flex-col gap-2 w-48 text-left">
                                                    <p>{toDateObj(ticket.departure_at, timeZoneFrom)} - {countArrival(ticket.departure_at, ticket.duration_to, timeZoneFrom)}</p>
                                                    <p>{toDateObj(ticket.return_at, timeZoneTo)} - {countArrival(ticket.return_at, ticket.duration_back, timeZoneTo)}</p>
                                                </div> :
                                                <p className="w-48 text-left">{toDateObj(ticket.departure_at, timeZoneFrom)} - {countArrival(ticket.departure_at, ticket.duration_to, timeZoneFrom)}</p>}
                                            {ticket.return_at ?
                                                <div className="flex flex-col gap-2 w-20 text-left">
                                                    <p>{stops}</p>
                                                    <p>{returnStops}</p>
                                                </div> : <p className="w-20 text-left">{stops}</p>}
                                            <p className="w-30 text-left">{new Intl.NumberFormat("ru-RU", {
                                                style: "currency",
                                                currency: "RUB"
                                            }).format(ticketsPrice)}</p>
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
                    <MiniTickets chosenTicket={chosenTicket}
                                 buttonType={pasInfo && (passengerInfo.length !== passengers.adult + passengers.minor) ? "inactive" : ""}
                                 handleClick={() => setPasInfo(true)} buttonNameCondition={pasInfo}
                                 firstName="Select seats"
                                 secondName="Passenger information"/> : null}
            </>
        </div>
    )
}
