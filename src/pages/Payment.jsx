import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Switcher from "../components/Switcher.jsx";
import {useState} from "react";
import MiniTickets from "../components/ui/MiniTickets.jsx";
import {useLocation, useNavigate} from "react-router";
import Tooltip from "../components/Tooltip.jsx";

export default function Payment() {
    const [visibleTip, setVisibleTip] = useState(false)
    const [visiblePass, setVisiblePass] = useState(false)
    const [newPaymentData, setNewPaymentData] = useState({
        nameOnCard: "",
        cardNumber: "",
        expirationDate: "",
        code: ""
    })
    const [infoConfirm, setInfoConfirm] = useState(false)
    const [infoSaved, setInfoSaved] = useState(false)
    const [chosenPay, setChosenPay] = useState("Credit card")
    const paymentOptions = ["Credit card", "Google Pay", "Apple pay", "Paypal", "Crypto"]

    const location = useLocation()
    const miniTicketInfo = {...location.state.stateObj, newPaymentData}

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        navigate("/confirmation", {
            state: {
                ...miniTicketInfo,
                cardConfirmation: infoConfirm
            }
        })
    }

    return (
        <div className="mt-15 mb-20 mx-20">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-[1000px]">
                <div className="flex flex-col gap-7">
                    <h2 className="text-2xl text-violet-600 font-medium">Payment method</h2>
                    <p className="text-xl text-gray-400">Select a payment method below. Tripma processes your payment
                        securely with end-to-end encryption.</p>
                </div>
                <Switcher options={paymentOptions} chosen={chosenPay} setChosen={setChosenPay}/>
                <MiniTickets chosenTicket={miniTicketInfo.chosenTicket} secondName="Confirm and pay"/>
                <div className="flex flex-col gap-7">
                    <h3 className="text-xl text-gray-500 font-medium">Credit card details</h3>
                    <div className="flex gap-3 items-center">
                        <input id="info-confirm" type="checkbox" checked={infoConfirm}
                               onChange={(event) => setInfoConfirm(event.target.checked)}
                               className={`accent-violet-500 appearance-none size-5 rounded-sm border-2 border-gray-400 cursor-pointer 
                        ${infoConfirm ? "before:block before:size-3 before:rounded-xs before:mx-0.5 before:my-0.5 before:bg-violet-500" : ""}`}/>
                        <label className="text-lg text-gray-400" htmlFor="info-confirm">Billing address is same as
                            Passenger 1</label>
                    </div>
                    <Input placeholder="Name on card" width="710"
                           value={infoConfirm ? miniTicketInfo.passengerInfo[0].name + " " + miniTicketInfo.passengerInfo[0].surname : newPaymentData.nameOnCard}
                           onChange={newValue => setNewPaymentData({...newPaymentData, nameOnCard: newValue})}
                           required/>
                    <Input placeholder="Card number" width="710" value={newPaymentData.cardNumber}
                           onChange={newValue => setNewPaymentData({...newPaymentData, cardNumber: newValue})}
                           required minLength={16}/>
                    <div className="flex gap-7 relative">
                        <div className="flex flex-col">
                            <Input placeholder="Expiration date" width="340" value={newPaymentData.expirationDate}
                                   onChange={newValue => setNewPaymentData({
                                       ...newPaymentData,
                                       expirationDate: newValue
                                   })} required/>
                            <p className="ml-2 mt-2 text-sm text-gray-400">MM/YY</p>
                        </div>
                        <Input placeholder="CCV"
                               icon={<img onMouseOver={() => setVisibleTip(true)}
                                          onMouseLeave={() => setVisibleTip(false)}
                                          src="src/assets/information.svg" alt="Information Icon" className="size-10"/>}
                               width="340" right={true} value={newPaymentData.code}
                               onChange={newValue => setNewPaymentData({...newPaymentData, code: newValue})} required/>
                        {visibleTip ?
                            <div className="absolute bottom-18 right-8"><Tooltip variant="bold" color="violet">The
                                security code on the back of the card</Tooltip></div> : null}
                    </div>
                </div>
                <div className="flex flex-col gap-7">
                    <h3 className="text-xl text-gray-500 font-medium">Create an account</h3>
                    <p className="text-xl text-gray-400">Tripma is free to use as a guest, but if you create an account
                        today,
                        you can save and view flights, manage your trips, earn rewards, and more.</p>
                    <div className="flex gap-3 items-center">
                        <input id="info-saved" type="checkbox" checked={infoSaved}
                               onChange={(event) => setInfoSaved(event.target.checked)}
                               className={`accent-violet-500 appearance-none size-5 rounded-sm border-2 border-gray-400 cursor-pointer 
                        ${infoSaved ? "before:block before:size-3 before:rounded-xs before:mx-0.5 before:my-0.5 before:bg-violet-500" : ""}`}/>
                        <label className="text-lg text-gray-400" htmlFor="info-saved">Save card and create account for
                            later</label>
                    </div>
                    <Input placeholder="Email address or phone number" width="710"
                           required={infoSaved}/>
                    <Input placeholder="Password" width="710" type={visiblePass ? "text" : "password"} minLength={8}
                           required={infoSaved}
                           icon={<img onClick={() => setVisiblePass(prev => !prev)} src="src/assets/eye.svg"
                                      alt="Visibility Icon" className="mr-72 size-10 cursor-pointer"/>} right={true}/>
                </div>
                <div className="flex items-center w-[710px] gap-2">
                    <div className="w-1/2 border-t border-gray-300"></div>
                    <span className="text-xl text-gray-400">or</span>
                    <div className="w-1/2 border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col gap-5 w-[710px]">
                    <Button variant="secondary" disabled={true}>Sign up with Google</Button>
                    <Button variant="secondary" disabled={true}>Continue with Apple</Button>
                    <Button variant="secondary" disabled={true}>Continue with Facebook</Button>
                </div>
                <div className="flex flex-col gap-7">
                    <h3 className="text-xl text-gray-500 font-medium">Cancellation policy</h3>
                    <p className="text-xl text-gray-400">This flight has a flexible cancellation policy.
                        If you cancel or change your flight up to 30 days before the departure date, you are eligible
                        for a free refund.
                        All flights booked on Tripma are backed by our satisfaction guarantee, however cancellation
                        policies vary by airline.
                        See the <span className="text-violet-600 hover:underline hover:cursor-pointer">full cancellation policy</span> for
                        this flight.
                    </p>
                </div>
                <div className="mt-10 flex gap-7">
                    <Button variant="secondary" navigation={() => navigate(-1)}>Back to seat select</Button>
                    <Button type={infoSaved ? "" : "inactive"}>Confirm and pay</Button>
                </div>
            </form>
        </div>
    )
}