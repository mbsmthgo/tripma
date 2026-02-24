import Input from "../Input.jsx";
import {useRef, useState} from "react";
import Button from "../Button.jsx";

export default function PassengerForm({setPassengerInfo, passenger, order}) {

    const [emInfo, setEmInfo] = useState({
        name: "",
        surname: "",
        email: "",
        phone: ""
    })
    const [bag, setBag] = useState(1)
    const [infoConfirm, setInfoConfirm] = useState(false)
    const [success, setSuccess] = useState(false)

    const nameInput = useRef(null)
    const middleInput = useRef(null)
    const surnameInput = useRef(null)
    const suffixInput = useRef(null)
    const birthInput = useRef(null)
    const emailInput = useRef(null)
    const phoneInput = useRef(null)
    const redressInput = useRef(null)
    const travellerInput = useRef(null)

    function decrement() {
        setBag(prev => Math.max(0, prev - 1))
    }

    function increment() {
        setBag(prev => prev + 1)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setPassengerInfo({
            name: nameInput.current.value,
            middleName: middleInput.current.value,
            surname: surnameInput.current.value,
            suffix: suffixInput.current.value,
            birth: birthInput.current.value,
            email: emailInput.current.value,
            phone: phoneInput.current.value,
            redress: redressInput.current.value,
            travellerPhone: travellerInput.current.value,
            emergencyInfo: emInfo,
            luggage: bag
        })
        setSuccess(true)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-7">
                <h3 className="text-xl text-gray-500 font-medium">Passenger {order} ({passenger})</h3>
                <div className="flex flex-wrap gap-5">
                    <Input placeholder="First name*" required="required" ref={nameInput} disabled={success}/>
                    <Input placeholder="Middle" ref={middleInput} disabled={success}/>
                    <Input placeholder="Last name*" required="required" ref={surnameInput} disabled={success}/>
                    <Input placeholder="Suffix" ref={suffixInput} disabled={success}/>
                    <div className="flex flex-col">
                        <Input placeholder="Date of birth*" required="required"
                               pattern="(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([0-9]{2})"
                               ref={birthInput} disabled={success}/>
                        <p className="ml-2 text-sm text-gray-400">MM/DD/YY</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-5">
                    <Input width="379.5" placeholder="Email address*" required="required" type="email"
                           ref={emailInput} disabled={success}/>
                    <Input width="379.5" placeholder="Phone number*" required="required" type="tel" ref={phoneInput} disabled={success}/>
                    <Input width="379.5" placeholder="Redress number" ref={redressInput} disabled={success}/>
                    <Input width="379.5" placeholder="Known traveller number*" required="required" type="tel"
                           ref={travellerInput} disabled={success}/>
                </div>
            </div>
            <div className="flex flex-col gap-7">
                <h3 className="text-xl text-gray-500 font-medium">Emergency contact information</h3>
                <div className="flex gap-3 items-center">
                    <input id="info-confirm" type="checkbox" checked={infoConfirm}
                           onChange={(event) => {
                               setInfoConfirm(event.target.checked)
                               setEmInfo({
                                   name: nameInput.current.value,
                                   surname: surnameInput.current.value,
                                   email: emailInput.current.value,
                                   phone: phoneInput.current.value
                               })
                           }}
                           className={`accent-violet-500 appearance-none size-5 rounded-sm border-2 border-gray-400 ${success ? "cursor-auto" : "cursor-pointer"}
                               ${infoConfirm ? "before:block before:size-3 before:rounded-xs before:mx-0.5 before:my-0.5 before:bg-violet-500" : ""}`} disabled={success}/>
                    <label className="text-lg text-gray-400" htmlFor="info-confirm">Same as Passenger {order}</label>
                </div>
                <div className="flex flex-wrap gap-5">
                    <Input width="379.5" placeholder="First name*" required="required"
                           onChange={newValue => setEmInfo({...emInfo, name: newValue})}
                           value={infoConfirm ? nameInput.current.value : emInfo?.name} disabled={success}/>
                    <Input width="379.5" placeholder="Last name*" required="required"
                           onChange={newValue => setEmInfo({...emInfo, surname: newValue})}
                           value={infoConfirm ? surnameInput.current.value : emInfo?.surname} disabled={success}/>
                    <Input width="379.5" placeholder="Email address*" required="required" type="email"
                           onChange={newValue => setEmInfo({...emInfo, email: newValue})}
                           value={infoConfirm ? emailInput.current.value : emInfo?.email} disabled={success}/>
                    <Input width="379.5" placeholder="Phone number*" required="required" type="tel"
                           onChange={newValue => setEmInfo({...emInfo, phone: newValue})}
                           value={infoConfirm ? phoneInput.current.value : emInfo?.phone} disabled={success}/>
                </div>
                <div className="flex flex-col gap-7">
                    <h3 className="text-xl text-gray-500 font-medium">Bag information</h3>
                    <p className="text-xl text-gray-400">Each passenger is allowed one free carry-on bag and one
                        personal
                        item.
                        First checked bag for each passenger is also free. Second bag check fees are waived for loyalty
                        program members.
                        See the <span
                            className="text-violet-600 hover:underline hover:cursor-pointer">full bag policy.</span></p>
                </div>
                <div className="flex gap-75 text-xl">
                    <div className="flex flex-col gap-5">
                        <p className="text-gray-400 font-medium">Passenger {order}</p>
                        <p className="text-gray-500">{infoConfirm ? emInfo?.name : nameInput?.current?.value} {infoConfirm ? emInfo?.surname : surnameInput?.current?.value}</p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className="text-gray-400 font-medium">Checked bags</p>
                        <div className="flex flex-row justify-center items-center gap-6">
                            <img onClick={success ? null : decrement}
                                 src="src/assets/minus.svg" alt="Minus Icon" className="cursor-pointer w-5 h-5"/>
                            <p className="text-gray-500">{bag}</p>
                            <img onClick={success ? null : increment}
                                 src="src/assets/plus.svg" alt="Plus Icon" className="cursor-pointer w-5 h-5"/>
                        </div>
                    </div>
                </div>
                <div className="flex gap-7">
                    <Button variant="secondary" type={!success ? "" : "inactive"} disabled={success}>Save</Button>
                    <Button variant="secondary" type={success ? "" : "inactive"} disabled={!success}
                    navigation={() => setSuccess(false)}>Edit</Button>
                </div>
            </div>
        </form>
    )
}