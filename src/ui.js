import { getWeatherData } from "./data"

function formatDate(strDate) {
    const date = new Date(strDate).toLocaleDateString('en-us', {weekday:'short'})
    return date
}

function parseIntTemp(value) {
    return parseInt(value)
}

export function renderWeatherData(currentData, extendedForecast) {
    const container = document.getElementById('container')
    container.innerHTML = ''

    /* barra de busqueda */
    const search = document.createElement('div')
    search.classList.add('search-bar')
    const input = document.createElement('input')
    input.setAttribute('placeholder', 'City, State, Country')
    input.setAttribute('type', 'text')


    const searchBtn = document.createElement('button')
    searchBtn.classList.add('search-btn')
    searchBtn.innerHTML = `<i class="fa fa-search""></i>`

    searchBtn.addEventListener('click', async () => {
        const city = input.value
        if (city) {
            try {
                const {currentData, extendedForecast} = await getWeatherData(city)
                renderWeatherData(currentData, extendedForecast)
            } catch (error) {
                console.error('Error fetching data', error)
                throw error
            }
        }
    })

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const city = input.value
            if (city) {
                try {
                    const {currentData, extendedForecast} = await getWeatherData(city)
                    renderWeatherData(currentData, extendedForecast)
                } catch (error) {
                    console.error('Error fetching data', error)
                    throw error
                }
            }
        }
    })

    search.appendChild(input)
    search.appendChild(searchBtn)
    container.appendChild(search)
    
    const card = document.createElement('div')
    card.classList.add('card')

    const address = document.createElement('p')
    address.classList.add('address')
    address.textContent = currentData.resolvedAddress

    const date = document.createElement('p')
    date.classList.add('date')
    const currentDate = new Date().toLocaleDateString('en-us', {year:'numeric', month:'short', day:'numeric'})
    date.textContent = currentDate

    const condition = document.createElement('p')
    condition.classList.add('condition')
    condition.textContent = currentData.conditions

    const currentTemp = document.createElement('p')
    currentTemp.classList.add('temp')
    currentTemp.textContent = `${parseIntTemp(currentData.temp)}º`

    const currentIconCondition = document.createElement('img')
    currentIconCondition.classList.add('weather-icon')
    currentIconCondition.src = `./dist/assets/icons/${currentData.icon}.svg`

    const extendedConditions = document.createElement('p')
    extendedConditions.classList.add('extended-conditions')
    extendedConditions.textContent = `${currentData.description}`



    card.appendChild(address)
    card.appendChild(date)
    card.appendChild(currentTemp)
    card.appendChild(currentIconCondition)
    card.appendChild(condition)

    container.appendChild(card)


    /* mostrar data del pronostico extendido */
    const forecastContainer = document.createElement('div')
    forecastContainer.classList.add('forecast-container')

    extendedForecast.forEach(day => {
        const forecastCard = document.createElement('div')
        forecastCard.classList.add('forecast-card')

        /* datos a renderizar */
        const extendedDay = document.createElement('p')
        extendedDay.classList.add('extended-day')
        extendedDay.textContent = formatDate(day.datetime)

        const extendedTempMin = document.createElement('p')
        extendedTempMin.classList.add('extended-temp')
        extendedTempMin.textContent = `${parseIntTemp(day.tempmin)}º`

        const extendedTempMax = document.createElement('p')
        extendedTempMax.classList.add('extended-temp')
        extendedTempMax.textContent = `${parseInt(day.tempmax)}º`

        forecastCard.appendChild(extendedDay)
        forecastCard.appendChild(extendedTempMax)
        forecastCard.appendChild(extendedTempMin)

        forecastContainer.appendChild(forecastCard)
    });
    container.appendChild(forecastContainer)
    container.appendChild(extendedConditions)
}
