import moment from 'moment';

function DetailCard({weather_icon, data}) {
    const {clouds, main, weather} = data.list[0]

    return (
        <div className="container p-4 flex items-center justify-center shadow-lg rounded-lg bg-white h-1/4 mb-auto">
            <div className="my-auto">
            <p className="font-bold text-3xl text-pink-800 mb-1">{Math.round(main.temp)}&deg;C</p>
            <p className="text-2xl text-gray-800 tracking-widest">{weather[0].main}
                <img src={weather_icon} className="w-1/4 inline" />
            </p>
            <p className="text-gray-400 text-xs uppercase tracking-widest">{weather[0].description}</p>
            <p className="tracking-wider">{moment().format("dddd MMM YYYY")}</p>
            </div>
            <div className="my-1 border-l-2 border-gray-100 p-2">
            <p className="text-gray-400 text-base">RealFeel: {Math.round(main.feels_like)}&deg;C</p>
            <p className="text-gray-400 text-base">Humidity: {main.humidity}%</p>
            <p className="text-gray-400 text-base">Cloud Cover: {clouds.all}%</p>
            <p className="text-gray-400 text-base">Min Temp: {Math.round(main.temp_min)}&deg;C</p>
            <p className="text-gray-400 text-base">Max Temp: {Math.round(main.temp_max)}&deg;C</p>
            </div>
        </div>
    )
}



export default DetailCard