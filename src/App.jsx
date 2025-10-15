import {BrowserRouter, Route, Routes} from "react-router"
import "tailwindcss"
import Home from "./pages/Home.jsx"
import Layout from "./components/ui/Layout.jsx"
import Flights from "./pages/Flights.jsx";
import Hotels from "./pages/Hotels.jsx";
import Packages from "./pages/Packages.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import SelectSeats from "./pages/SelectSeats.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="flights" element={<Flights/>}/>
                    <Route path="booking" element={<SelectSeats/>}/>
                    <Route path="hotels" element={<Hotels/>}/>
                    <Route path="packages" element={<Packages/>}/>
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
