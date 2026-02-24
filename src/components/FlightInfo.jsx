export default function FlightInfo({origin, destination, date, depTime, arrTime, flightType}) {
    return (
        <div className="flex items-center w-full h-[125px] bg-gray-800 text-white">
            <div className="px-10 w-[500px] flex items-center justify-between">
                <p className="text-4xl font-semibold">{origin}</p>
                <img src="src/assets/arrow-trip.svg" alt="Arrow Icon" className={`size-8 ${flightType === "Arriving" ? "rotate-180" : ""}`}/>
                <p className="text-4xl font-semibold">{destination}</p>
            </div>
            <div className="px-10 bg-violet-500 h-full w-1/3 flex flex-col justify-center">
                <p className="flex gap-2 text-2xl">{date} <span
                    className="font-light opacity-50">|</span> {depTime}
                </p>
                <p className="text-lg font-light">Departing</p>
            </div>
            <div className="px-10 w-1/3 flex flex-col justify-center">
                <p className="text-2xl">{arrTime}</p>
                <p className="text-lg font-light">Arriving</p>
            </div>
        </div>
    )
}