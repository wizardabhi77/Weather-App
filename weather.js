
const locationInput = document.querySelector('#location');
const submitButton = document.querySelector('button');

submitButton.addEventListener('click',handleSubmit);

async function getWeather (location){

    try {
        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=AWSBXLML7WN6KRT2UV65FPXHY`);

        let weather = await weatherData.json();

        weather = transformData(weather);

        console.log(weather);

    }catch(error){
        
        console.log(error);

    }
     
}

function transformData (weather) {

    let currConditions = weather.currentConditions.conditions;
    let currTime = weather.currentConditions.datetime;
    let temperature = weather.currentConditions.temp;
    let windSpeed = weather.currentConditions.windspeed;
    let address = weather.resolvedAddress;

    return { address,currConditions, currTime, temperature, windSpeed};
}

function handleSubmit (e) {
    
    e.preventDefault();
    let location = locationInput.value;
    getWeather(location);

}


