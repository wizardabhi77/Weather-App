
const locationInput = document.querySelector('#location');
const submitButton = document.querySelector('button');
const weatherCard = document.querySelector('.weather');
const body = document.querySelector('body');

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

    const gifyData = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Ym287vYVjZc5zoUoVGoGT6LnVj4sLWum&s=${conditions} weather&weirdness=4`);
    
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
    let tempChange = document.createElement('button');
    let windSpeed = document.createElement('p');
    let tempDiv = document.createElement('div');

    tempDiv.id = 'temp';
    tempDiv.append(temperature);
    tempDiv.append(tempChange);

    windSpeed.id = 'wind';

    tempChange.classList = 'celsius';
    tempChange.innerHTML ='TO CELSIUS';

    if(Number(weather.temperature) >= 100){
        body.style.backgroundImage = "url('./Assets/hot.jpg')";
    }
    else if(Number(weather.temperature) <= 69){
        body.style.backgroundImage = "url('./Assets/cold.jpg')";
    }
    else {
        body.style.backgroundImage = "url('./Assets/sunny.jpg')";
    }

    address.innerHTML = weather.address;
    currConditions.innerHTML = weather.currConditions;
    currTime.innerHTML = `TIME : ${weather.currTime}`;
    temperature.innerHTML = `Temperature: ${weather.temperature}`;
    windSpeed.innerHTML = `Wind Speed : ${weather.windSpeed}`;
    
    tempChange.addEventListener('click', (e) => {
        
        let temp = Number(weather.temperature);

        if(e.target.classList[0] === 'celsius') {
            
            temp = Math.floor((temp - 32) / 1.8);
            
            e.target.classList = 'farenheit';
            e.target.innerHTML = 'TO FARENHEIT';
        }
        else
        {
            temp = Number(weather.temperature);
            e.target.classList = 'celsius';
            e.target.innerHTML ='TO CELSIUS';
        }

        temperature.innerHTML = `Temperature: ${temp}`;

    })

    while(weatherCard.contains(weatherCard.firstElementChild)){

        weatherCard.removeChild(weatherCard.lastElementChild);
    
    }

    weatherCard.append(address);
    weatherCard.append(currConditions);
    weatherCard.append(currTime);
    weatherCard.append(tempDiv);
    weatherCard.append(windSpeed);

    getGIF(weather.currConditions);

}
function handleSubmit (e) {
    
    e.preventDefault();
    let location = locationInput.value;
    getWeather(location);

}


