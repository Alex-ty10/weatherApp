import { useState } from 'react'
import Header from './components/Header'
import DetailCard from './components/DetailCard'
import SummaryCard from './components/SummaryCard'
import ScrollHint from './components/ScrollHint'


function App() {

  const API_KEY = process.env.REACT_APP_API_KEY

  const [noData, setNoData] =useState('No Data Yet')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Unkown location')
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`)

  const handleChange = input => {
    
    const {value} = input.target
    setSearchTerm(value)
  }

  const clearData = () => {
    setSearchTerm('')
    setWeatherData([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(searchTerm.length > 0){
      getWeather(searchTerm)
    }else{
      alert("Te estas portando mal seras castigada!!😬😬")
    }
  }

  const getWeather = async (location) => {
    setWeatherData([])
    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`

    try {
      const url = `${process.env.REACT_APP_URL+how_to_search}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      let res = await fetch(url)
      let data = await res.json()
      if(data.cod != 200) {
        setNoData('Location Not Found')
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`)
    } catch (error) {
      console.log(error)
    }
  }

  const myIP = (location) => {
    const {latitude, longitude} = location.coords
    console.log(latitude, longitude)
    getWeather([latitude, longitude])
  }

  return (
    <div className="bg-gray-800 flex items-center justify-center w-screen h-screen lg:p-10">
      <div className="flex flex-col w-full h-full bg-gray-100 md:flex-row lg:w-11/12 md:min-h-full md:rounded-3xl md:shadow-md md:overflow-hidden">
          {/* form card section  */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3 className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 
            rounded-md bg-white bg-opacity-50">SkyCast ❤</h3>
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-md">
            <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-2xl">The Only Weather Forecast You Need</h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form noValidate onSubmit={e => handleSubmit(e)} className="flex justify-center w-full">
              <input type="text" 
                placeholder="Enter location" 
                className="focus:outline outline-1 outline-gray-300 focus:bg-slate-700 focus:bg-opacity-40 focus:placeholder-gray-50 relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-40 text-white placeholder-gray-200"
                value={searchTerm}
                onChange={handleChange} 
                required />
                <button type="submit" className="z-10">
                  <i className="fa fa-search text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3" 
                  aria-hidden="true" type="submit"></i>
                </button>
              <i className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white" aria-hidden="true" onClick={() => {
                navigator.geolocation.getCurrentPosition(myIP)
              }}></i>
            </form>
          </div>
          {weatherData.length === 0 ? null : <ScrollHint/>}
        </div>
        {/* info card section  */}
        {weatherData.length === 0 ?
         <div className="container p-4 hidden items-center justify-center h-1/3 mb-auto w-3/5 md:flex">
           <h1 className="text-gray-300 text-4xl font-bold uppercase">{noData}</h1>
         </div> 
        : <div className='w-screen px-5 py-4 md:w-3/5'>
          <Header clearData={clearData}/>
          <div className="flex flex-col my-5">
            {/* card jsx  */}
                <h1 className="text-4xl text-gray-800 mt-auto mb-3">Today</h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className="text-2xl text-gray-600 mb-3 mt-5">More On {city}</h1>
                <ul className="grid grid-cols-2  gap-2">
                  {weatherData.list.map( (days, index) => {
                    if(index > 0){
                    return (
                      <SummaryCard key={index} day={days} />
                    )
                  }
                  })}
                </ul>
          </div>
        </div>}
      </div>
    </div>
  );

}

export default App;
