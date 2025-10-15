import React, {useEffect, useMemo, useState} from 'react';
import Combobox from "../Combobox.jsx";
import MyDayPicker from "../MyDayPicker.jsx";
import SelectBox from "../SelectBox.jsx";
import Button from "../Button.jsx";
import {useNavigate} from "react-router";

function Search({
                    initialDeparture = "",
                    initialArrival = "",
                    initialDate = new Date(),
                    initialPassenger = {adults: 0, minors: 0},
                    setOpen
                }) {
    const [departure, setDeparture] = useState(initialDeparture)
    const [arrival, setArrival] = useState(initialArrival)
    const [date, setDate] = useState(initialDate)
    const [passenger, setPassenger] = useState(initialPassenger)
    const [airportData, setAirportData] = useState([])

    function airportToString(obj) {
        if (obj.name) {
            return obj.country_code + " " + obj.name  + ` (${obj.code})`
        } else {
            return obj.country_code + " " + obj.name_translations.en + ` (${obj.code})`
        }
    }

    function filterSearch(array, query) {
        if (!query || query.trim().length === 0) {
            return array
        } else {
            return array.filter((e) => e.toLowerCase().includes(query.trim().toLowerCase()))
        }
    }

    const filteredSearchDeparture = useMemo(() => {
        return filterSearch(airportData, departure)
    }, [airportData, departure])
    const filteredSearchArrival = useMemo(() => {
        return filterSearch(airportData, arrival)
    }, [airportData, arrival])

    useEffect(() => {
        fetch("https://api.travelpayouts.com/data/en/airports.json")
            .then(res => res.json())
            .then(data => setAirportData(data.map(airportToString)))
    }, [])

    const navigate = useNavigate()

    return (
        <div className="mt-20 text-xl flex flex-row items-start">
            <Combobox value={departure}
                      onChange={setDeparture}
                      options={filteredSearchDeparture}
                      placeholder="From where?"
                      icon={<img src="src/assets/departure.svg" alt="Departure Icon"/>}
                      width="400"
                      setOpen={setOpen}/>
            <Combobox value={arrival}
                      onChange={setArrival}
                      options={filteredSearchArrival}
                      placeholder="Where to?"
                      icon={<img src="src/assets/arrival.svg" alt="Arrival Icon"/>}
                      width="400"
                      setOpen={setOpen}/>
            <MyDayPicker placeholder="Depart - Return"
                         icon={<img src="src/assets/calendar.svg" alt="Calendar Icon"/>}
                         readonly="readonly" width="350" value={date} onChange={setDate}/>
            <SelectBox placeholder="1 Adult" icon={<img src="src/assets/person.svg" alt="Person Icon"/>}
                       readonly="readonly" width="300"
                       value={passenger} onChange={setPassenger}/>
            <Button navigation={() => {
                const paramsObj = {
                    from: departure,
                    to: arrival,
                    date: date,
                    passenger: passenger
                }
                navigate('/flights', {
                    state: paramsObj
                })
            }
            }>Search</Button>
        </div>
    )
}

export default Search;