import {Outlet} from "react-router"
import Banner from "../Banner.jsx"
import Header from "./Header.jsx"

export default function Layout() {
    return (
        <>
            <Banner variant="caution" />
            <Header />
            <Outlet/>
        </>
    )
}