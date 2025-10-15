import Search from "../components/ui/Search.jsx";

export default function Home() {
    return (
        <div
            className="w-screen h-[80vh] bg-[url(src/assets/map.svg)] bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center">
            <h1 className="text-8xl w-175 h-55 text-center font-bold text-transparent bg-clip-text bg-radial from-purple-500 to-indigo-500">It's
                more than just a trip</h1>
            <Search />
        </div>
    )
}