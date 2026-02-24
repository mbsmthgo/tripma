import {useMemo, useState} from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import {useLocation} from "react-router";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import {nanoid} from "nanoid";

dayjs.extend(advancedFormat);

export default function Confirmation() {
    const [visible, setVisible] = useState(true)
    const [emails, setEmails] = useState(["Email"])

    const location = useLocation()
    const confirmationInfo = location.state

    function toFormatDeparture() {
        if (confirmationInfo.when.length <= 6) {
            return confirmationInfo.when
        } else {
            return confirmationInfo.when.slice(0, 6)
        }
    }

    function toFormatArrival() {
        return confirmationInfo.when.slice(-6)
    }

    function addInput() {
        setEmails([...emails, "Email"])
        return emails
    }

    const confirmationNumber = useMemo(() => getRandomNumber(100000000000, 999999999999), []
    )

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const departureFullDate = new Date(toFormatDeparture()).setFullYear(2025)
    const arrivalFullDate = new Date(toFormatArrival()).setFullYear(2025)
    const departureFormatDate = dayjs(departureFullDate).format("MMMM Do, YYYY")
    const arrivalFormatDate = dayjs(arrivalFullDate).format("MMMM Do, YYYY")
    // вынести вычисление и разобраться с отправлениями после 2025 года

    return (
        <div className="my-20 mx-30 flex gap-125">
            <div className="flex flex-col gap-15 w-1/2">
                {visible ?
                    <div
                        className="flex justify-between items-center w-full h-24 bg-teal-50 ring ring-teal-600 shadow-md rounded-xl text-teal-600 px-10 text-[22px] tracking-wide">
                        <p>Your flight has been booked successfully! Your confirmation number is
                            #{confirmationNumber}</p>
                        <div onClick={() => setVisible(false)} className="cursor-pointer">
                            <svg width="40" height="40" viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.5858 16L10.3431 11.7574C9.95261 11.3668 9.95261 10.7337 10.3431 10.3431C10.7337 9.95262 11.3668 9.95262 11.7573 10.3431L16 14.5858L20.2426 10.3431C20.6332 9.95262 21.2663 9.95262 21.6568 10.3431C22.0474 10.7337 22.0474 11.3668 21.6568 11.7574L17.4142 16L21.6568 20.2426C22.0474 20.6332 22.0474 21.2663 21.6568 21.6569C21.2663 22.0474 20.6332 22.0474 20.2426 21.6569L16 17.4142L11.7573 21.6569C11.3668 22.0474 10.7337 22.0474 10.3431 21.6569C9.95261 21.2663 9.95261 20.6332 10.3431 20.2426L14.5858 16Z"
                                    fill="currentColor"/>
                            </svg>
                        </div>
                    </div> : null}
                <div className="flex flex-col gap-7">
                    <h2 className="-mt-5 text-3xl font-medium text-violet-600">Bon
                        voyage, {confirmationInfo.passengerInfo[0].name}!</h2>
                    <p className="text-xl text-gray-500 font-medium">Confirmation number: #{confirmationNumber}</p>
                    <p className="text-xl text-gray-400">Thank you for booking your travel with Tripma! Below is a
                        summary of your trip to {confirmationInfo.to}.
                        We’ve sent a copy of your booking confirmation to your email address. You can also find this
                        page again in <span
                            className="text-violet-600 hover:underline hover:cursor-pointer">My trips</span>.
                    </p>
                </div>
                <div className="flex flex-col gap-7">

                    <h2 className="text-3xl font-medium text-gray-500">Flight summary</h2>

                    {confirmationInfo.chosenTicket?.filter((ticket) => ticket.duration !== "0h 0m").map(ticket =>
                        <div className="flex flex-col gap-5" key={nanoid()}>
                            <p className="text-xl text-gray-500 font-medium">{ticket.link ? `Departing ${departureFormatDate}` : `Arriving ${arrivalFormatDate}`}</p>
                            <div
                                className="flex justify-between items-center gap-30 w-full h-28 ring ring-gray-300 rounded-md px-10 text-xl">
                                <img
                                    src={`https://pics.avs.io/200/200/${confirmationInfo.chosenTicket?.[0]?.airline}.png`}
                                    alt="Airline Logo" className="size-28"/>
                                <div className="-ml-10 flex flex-col gap-2 py-4">
                                    <p>{ticket.duration}</p>
                                    <p className="text-gray-400">{confirmationInfo.chosenTicket?.[0]?.airline}</p>
                                </div>
                                <p>{ticket.departure} - {ticket.arrival}</p>
                                <p>{ticket.stops}</p>
                                <p>{confirmationInfo.chosenTicket?.[1]?.duration !== "0h 0m" ? (confirmationInfo.chosenTicket?.[0]?.price) / 2 : confirmationInfo.chosenTicket?.[0]?.price}₽</p>
                            </div>
                            {confirmationInfo.selected.filter((seat, index) => {
                                if (!ticket.link && confirmationInfo.selected.length > confirmationInfo.passengerCount) {
                                    return index >= confirmationInfo.passengerCount
                                }
                                return index < confirmationInfo.passengerCount}).map((seat, index) =>
                                <p key={index}
                                   className="text-xl text-gray-400">Seat {seat} ({confirmationInfo.seatClass[index]}, {confirmationInfo.seatCategory[index]}), {confirmationInfo.passengerInfo[index]?.luggage} checked {confirmationInfo.passengerInfo[index]?.luggage > 1 ? "bags" : "bag"}</p>
                            )}
                        </div>
                    )}

                </div>
                <div className="flex flex-col gap-7">
                    <h2 className="text-3xl font-medium text-gray-500">Price breakdown</h2>
                    <div className="w-2/3 grid grid-cols-2 gap-y-3 text-xl text-gray-500 border-b border-gray-500">
                        <p>Departing Flight</p>
                        <p className="text-right">$251.50</p>
                        <p>Baggage fees</p>
                        <p className="text-right">$0</p>
                        <p>Seat upgrade (business)</p>
                        <p className="text-right">$199</p>
                        <p>Subtotal</p>
                        <p className="text-right">$450.50</p>
                        <p>Taxes (9.4%)</p>
                        <p className="mb-3 text-right">$66</p>
                    </div>
                    <div
                        className="-mt-4 pb-3 w-2/3 grid grid-cols-2 gap-y-3 text-xl text-gray-900 font-medium border-b border-gray-500">
                        <p>Amount paid</p>
                        <p className="text-right">$516.50</p>
                    </div>
                </div>
                <div className="flex flex-col gap-7">
                    <h2 className="text-3xl font-medium text-gray-500">Payment method</h2>
                    <div
                        className="text-white text-xl p-8 w-90 h-60 rounded-3xl bg-linear-to-b from-pink-600 to-red-400">
                        <img src="src/assets/visa.svg" alt="Visa Logo" className="-mt-6 size-24"/>
                        <p className="mt-10">{confirmationInfo.cardConfirmation ? confirmationInfo.passengerInfo[0].name + " " + confirmationInfo.passengerInfo[0].surname : confirmationInfo.newPaymentData.nameOnCard}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <p>••••••••••••{confirmationInfo.newPaymentData.cardNumber.slice(-4)}</p>
                            <p>{confirmationInfo.newPaymentData.expirationDate}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-7">
                    <h2 className="text-3xl font-medium text-gray-500">Share your travel itinerary</h2>
                    <p className="text-xl text-gray-400">You can email your itinerary to anyone by entering their email
                        address here.</p>
                    {emails.map(email => <Input key={nanoid()} placeholder="Email address" type="email" width="490"/>)}
                    <div className="flex gap-4">
                        <Button>Email itinerary</Button>
                        <Button variant="tertiary" navigation={addInput}>Add another</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-7">
                <h2 className="text-3xl font-medium text-gray-500">Shop <span className="text-violet-600">hotels</span>
                </h2>
                <p className="w-135 text-xl text-gray-400">Tripma partners with thousands of hotels to get you the best
                    deal.
                    Save up to 30% when you add a hotel to your trip.</p>
                <div className="mt-3 w-135 h-105 bg-white rounded-2xl border-b-2 border-gray-200 shadow-lg cursor-pointer
                transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                    <img src="src/assets/hotel.jpg" alt="Hotel example"
                         className="w-full h-75 object-cover rounded-t-2xl"/>
                    <div className="flex justify-between mt-6 mx-6 text-xl text-gray-500 font-medium">
                        <h3>Secrets Akumal Riviera Maya</h3>
                        <p className="-mt-2">$3168</p>
                    </div>
                    <p className="mt-2 ml-6 text-xl text-gray-400">Enjoy views of the tropical beach from your room</p>
                </div>
            </div>
        </div>
    )
}