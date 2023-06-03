function Header({ clearData }) {
    return (
        <ul className="flex w-full font-bold justify-end">
            <li className="text-xs text-gray-800 ml-4 border-b-2 border-teal-600 cursor-pointer">Weather</li>
            <button className="text-xs text-gray-800 ml-4 border-b-2 bg-teal-600 cursor-pointer rounded-md px-1 py-0.5 hover:bg-teal-600 hover:bg-opacity-70" onClick={clearData}>Clear</button>
           {/*  <li className="text-xs text-gray-800 mr-6 alert-notice cursor-pointer border-b-2 hover:border-green-400">Alerts</li>
            <li className="text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400">Map</li>
            <li className="text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400">Satelite</li>
            <li className="text-xs text-gray-800 cursor-pointer border-b-2 hover:border-green-400">News</li> */}
        </ul>
    )
}

export default Header