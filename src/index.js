import { getWeatherData  } from "./data"
import { renderWeatherData } from "./ui"
import "./style.css"

async function main() {
    const {currentData, extendedForecast} = await getWeatherData()
    renderWeatherData(currentData, extendedForecast)
}
main()