import "./App.css"
import { useState } from "react"
import { useQuery, QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient()

export default function App() {
  const [city, setCity] = useState("")
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <SearchCity city={city} setCity={setCity} />
        <FindCity city={city} />
      </div>
    </QueryClientProvider>
  )
}

export function SearchCity({ city, setCity }) {
  function changeValue(e) {
    setCity(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    changeValue()
    setCity("")
  }
  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search-city" className="form-label">
            Weather Of City
          </label>
          <br />
          <input
            type="search"
            className="form-control"
            value={city}
            onChange={changeValue}
            name="search-city"
            placeholder="Karachi"
          />
        </div>
        <button type="submit" className="btn btn-dark w-100 my-2">
          Check Weather
        </button>
      </form>
    </>
  )
}
function FindCity({ city }) {
  const { data, isError, isSuccess } = useQuery(`${city}`, async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q= ${city} &appid=01a7e742c57c988c7be20dd468b9d579`
    )
    const result = await res.json()
    return result
  })
  // console.log(isError)
  // console.log(isSuccess)
  // console.log(data)
  // const citiesArr = []
  // if (isSuccess) {
  //   let newArr = citiesArr.push(<p>{`Weather of ${data.name}`}</p>)
  //   // console.log("-d-fjhkfe", newArr)
  //   let cityName = newArr.map((a, i) => <li key={i}> {a.name} </li>)
  // }
  return (
    <>
      <p>{isError && <p>Error Calling API</p>}</p>
      <div>
        {isSuccess && (
          <div className="container border bg-dark p-4 rounded text-white">
            <p>
              {city !== ""
                ? ` Weather of ${data.name}`
                : "Enter city name to check weather"}
            </p>
            {data.main && (
              <div>
                {isSuccess && (
                  <div className="container border bg-dark p-4 rounded text-white">
                    {data.main && (
                      <div>
                        {" "}
                        <p>{`Temprature: ${Math.round(
                          data.main.temp - 273
                        )} °C `}</p>
                        <p>{`Humidity: ${data.main.humidity}`}</p>
                        <p>{`Feels Like:  ${Math.round(
                          data.main["feels_like"] - 273
                        )} °C`}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

// const fetchCity =
