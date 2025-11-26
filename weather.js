

async function getWeather (location){

    try {
        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=AWSBXLML7WN6KRT2UV65FPXHY`);

        const weather = await weatherData.json();

        console.log(weather);

    }catch(error){
        
        console.log(error);

    }
     
}

getWeather('hyderabad');