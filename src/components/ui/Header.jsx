import {Link, useNavigate} from "react-router"
import Button from "../Button.jsx"

export default function Header() {
    const navigate = useNavigate();
    const buttons = [
        {
            id: 0,
            text: "Flights",
            path: "flights"
        },
        {
            id: 1,
            text: "Hotels",
            path: "hotels"
        },
        {
            id: 2,
            text: "Packages",
            path: "packages"
        },
        {
            id: 3,
            text: "Sign in",
            path: "signin"
        }
    ]
    return (
        <div className="w-screen h-35 bg-white p-10 flex flex-row items-center justify-between">
            <Link to="/" className="text-4xl font-bold font-sans text-violet-600">Tripma</Link>
            <nav className="flex items-center gap-10">
                {buttons.map(button => (
                    <Button key={button.id} variant="tertiary" type="inactive" navigation={() => navigate(button.path)}>{button.text}</Button>
                ))}
                <Button navigation={() => navigate("signup")}>Sign up</Button>
            </nav>
        </div>
    )
}