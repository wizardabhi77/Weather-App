
const locationInput = document.querySelector('#location');
const submitButton = document.querySelector('button');
const weatherCard = document.querySelector('.weather');

submitButton.addEventListener('click',handleSubmit);

async function getWeather (location){

    try {
        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=AWSBXLML7WN6KRT2UV65FPXHY`);

        let weather = await weatherData.json();

        weather = transformData(weather);

        

        displayWeather(weather);
        

    }catch(error){
        
        console.log(error);

    }
     
}

async function getGIF (conditions) {

    let img = document.createElement('img');

    const gifyData = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Ym287vYVjZc5zoUoVGoGT6LnVj4sLWum&s=${conditions}&weirdness=4`);
    
    const gif = await gifyData.json();
    
    let gifURL = gif.data.images.original.url;

    img.src = gifURL;
    
    
    weatherCard.append(img);
   
    
}
function transformData (weather) {

    let currConditions = weather.currentConditions.conditions;
    let currTime = weather.currentConditions.datetime;
    let temperature = weather.currentConditions.temp;
    let windSpeed = weather.currentConditions.windspeed;
    let address = weather.resolvedAddress;

    return { address,currConditions, currTime, temperature, windSpeed};
}

function displayWeather (weather) {

    let address = document.createElement('h1');
    let currConditions = document.createElement('h2');
    let currTime = document.createElement('div');
    let temperature = document.createElement('p');
    let windSpeed = document.createElement('p');
    

    

    address.innerHTML = weather.address;
    currConditions.innerHTML = weather.currConditions;
    currTime.innerHTML = weather.currTime;
    temperature.innerHTML = weather.temperature;
    windSpeed.innerHTML = weather.windSpeed;
    

    weatherCard.append(address);
    weatherCard.append(currConditions);
    weatherCard.append(currTime);
    weatherCard.append(temperature);
    weatherCard.append(windSpeed);

    getGIF(weather.currConditions);

}
function handleSubmit (e) {
    
    e.preventDefault();
    let location = locationInput.value;
    getWeather(location);

}


