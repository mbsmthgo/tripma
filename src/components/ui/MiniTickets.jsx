import Button from "../Button.jsx";
import {nanoid} from "nanoid";

export default function MiniTickets({
                                        chosenTicket,
                                        buttonType,
                                        handleClick,
                                        buttonNameCondition,
                                        firstName,
                                        secondName
                                    }) {
    const tax = chosenTicket?.[0]?.price / 100 * 20
    return (
        <div className="flex flex-col items-end gap-7 absolute top-132.5 right-20">
            {chosenTicket?.filter(ticket => ticket.duration !== "0h 0m").map(ticket =>
                <div className="w-[600px] h-[150px] ring-2 ring-gray-200 bg-white rounded-xl shrink-0" key={nanoid()}>
                    <div className="flex items-start gap-10 p-7 text-xl ">
                        <img src={`https://pics.avs.io/100/100/${chosenTicket[0].airline}.png`}
                             alt="Airlines Icon"/>
                        <div className="flex flex-col gap-1 -ml-3 w-[200px]">
                            <p>{chosenTicket[0].airline}</p>
                            <p className="text-gray-400">{chosenTicket[0].flight}</p>
                        </div>
                        <div className="flex flex-col gap-1 text-center w-[200px]">
                            <p>{ticket.duration}</p>
                            <p>{ticket.departure} - {ticket.arrival}</p>
                            <p className="text-gray-400">{ticket.stops}</p>
                        </div>
                    </div>
                </div>)}
            <div className="flex flex-col items-end gap-2 text-xl font-medium">
                <p className="flex gap-12">Subtotal <span>{new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB"
                }).format(chosenTicket?.[0]?.price - tax)}</span></p>
                <p className="flex gap-12">Taxes and Fees <span>{new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB"
                }).format(tax)}</span></p>
                <p className="flex gap-12">Total <span>{new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB"
                }).format(chosenTicket?.[0]?.price)}</span></p>
            </div>
            <Button type={buttonType}
                    navigation={handleClick}>{buttonNameCondition ? firstName : secondName}</Button>
        </div>
    )
}