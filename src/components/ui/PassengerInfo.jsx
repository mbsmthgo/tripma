import Button from "../Button.jsx";
import PassengerForm from "./PassengerForm.jsx";
import {useNavigate} from "react-router";

export default function PassengerInfo({
                                          to,
                                          from,
                                          when,
                                          chosenTicket,
                                          passengers,
                                          passengerInfo,
                                          setPassengerInfo
                                      }) {

    const navigate = useNavigate()

    function handlePassenger(passenger, index) {
        const passengerInfoCopy = [...passengerInfo]
        passengerInfoCopy.splice(index, 1, passenger)
        setPassengerInfo(passengerInfoCopy)
    }

    return (
        <div className="mt-15 flex flex-col gap-15 w-[1000px] mb-20">
            <div className="flex flex-col gap-7">
                <h2 className="text-2xl text-violet-600 font-medium">Passenger information</h2>
                <p className="text-xl text-gray-400">Enter the required information for each traveler and be sure that
                    it exactly matches the government-issued ID presented at the airport.</p>
            </div>
            {Array.from({length: passengers.adult}).map((passenger, index) => <PassengerForm passenger="Adult"
                                                                                             key={index}
                                                                                             order={index + 1}
                                                                                             setPassengerInfo={(object) => handlePassenger(object, index)}/>)}
            {Array.from({length: passengers.minor}).map((passenger, index) => <PassengerForm passenger="Minor"
                                                                                             key={index}
                                                                                             order={index + 1 + passengers.adult}
                                                                                             setPassengerInfo={(object) => handlePassenger(object, index + passengers.adult)}/>)}
            <div className="mt-5">
                <Button type={passengerInfo.length === passengers.adult + passengers.minor ? "" : "inactive"}
                        disabled={passengerInfo.length !== passengers.adult + passengers.minor}
                        navigation={() => navigate("/booking", {
                            state: {
                                passengerInfo: passengerInfo,
                                to: to,
                                from: from,
                                when: when,
                                chosenTicket: chosenTicket,
                                passengerCount: passengers.adult + passengers.minor
                            }
                        })}>Select seats</Button>
            </div>
        </div>
    )
}