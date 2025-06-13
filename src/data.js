export async function getWeatherData(city = 'San José, Entre Ríos, Argentina') {
    try {
        const cityValue = encodeURIComponent(city)
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityValue}?unitGroup=metric&key=AAXM8JT5VG846K7FM3VGM4S6S&contentType=json`)
        const data = await response.json()
        
        const hour = new Date().getHours();
        const currentData = data.days[0].hours[hour]
        /* datos adicionales */
        currentData.resolvedAddress = data.resolvedAddress
        currentData.description = data.description
        
        const extendedForecast = []
        for (let i = 2; i <= 7; i++) {
            extendedForecast.push(data.days[i]);
        }

        console.log(currentData)
        console.log(extendedForecast)

        return {currentData, extendedForecast}

    } catch (error) {
        console.error('Error fetching data', error)
        throw error
    }
}