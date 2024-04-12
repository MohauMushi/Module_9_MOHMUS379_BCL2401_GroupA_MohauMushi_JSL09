/*
The code uses the fetch function to make an asynchronous request to the Unsplash API for a random landscape-oriented nature photo.
It then updates the background image of the webpage with the retrieved photo using document.body.style.backgroundImage.
Then it sets the text content of the element with the ID "author" to display the name of the author of the photo. 
*/
try{
    const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await response.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch(err){
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTI2NjE1OTR8&ixlib=rb-4.0.3&q=80&w=1080)`;
    document.getElementById("author").textContent = `By: John Johnson`;
}

/*
The below code it define an asynchronous function that fetches a random quote from an API,then
the 'fetch' function is used to make a request to the API endpoint, and the 'json' method is called on the response object to extract the data,
the text content of the HTML element with the id 'quotes-author' is set to the quote content, then the final 
function is called to fetch and display a random quote
*/
async function fetchRandomQuote() {
    const response = await fetch('https://stoic.tekloon.net/stoic-quote');
    const data = await response.json();
    document.getElementById("quotes-author").textContent = `"${data.quote}" by ${data.author}`;
    }
    fetchRandomQuote();

/*
The code below uses fetch function to retrive data about the cryptocurrency data for dogecoin from the 
CoinGecko API, The then method is used to handle the response asynchronously, like If the response is not okay 
then an error is thrown.
Once the JSON data is obtained, it is used to update the content of the HTML elements with the IDs "crypto-top" and "crypto".
The name and icon of the cryptocurrency are added to the upper-left of the dashboard page, and the current price, 24-hour high, and 24-hour low prices are displayed.
Any errors that occur during the process are caught and logged to the console.
*/

try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/ethereum")
    if(!response.ok){
        throw Error("Something went wrong")
        }
    const data = await response.json()
    document.getElementById("crypto-top").innerHTML = `
        <img src = ${data.image.small}/>
        <span> ${data.name}</span>
    ` 
    document.getElementById("crypto").innerHTML += `
        <p> 🎯  R ${data.market_data.current_price.zar}</P>
        <p> 📈  R ${data.market_data.high_24h.zar}</P>
        <p> 📉  R ${data.market_data.low_24h.zar}</P>
    `
} catch (err) {
    console.log(err)
}


/*
The below function(getCurrentTime) gets the current date and time using new Date(), then it updates the text content of the HTML element 
with the ID "time" to display the current time in a short time format using toLocaleTimeString.
The setInterval method is used to call the getCurrentTime function at regular intervals and the time is updated every second.
*/
const getCurrentTime = () =>{
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"});
}
setInterval(getCurrentTime,1000);

/*
Below code method (navigator.geolocation.getCurrentPosition) retrieves the user's current position. Upon successful retrieval, it executes a callback function with the obtained position data.
Inside the callback function, a fetch request is made to the OpenWeatherMap API using the obtained latitude and longitude coordinates. The units=metric parameter is included to request weather data in metric units.
The response from the OpenWeatherMap API is processed using the then method. If the response is not okay, then an error is thrown.
If the response is okay, the JSON data is accessed and used to construct the weather information to be displayed on the webpage. The weather icon, temperature,
and city name are extracted from the data and dynamically inserted into the HTML content of an element with the ID "weather".
Any errors that occur during the process are caught and logged to the console using the catch method. 
*/


navigator.geolocation.getCurrentPosition(async position => {
  try {
    const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
    if(!response.ok){
        throw Error("Weather data not available")
    }
    const data = await response.json()
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("weather").innerHTML = `
    <img class="weather-img" src=${iconUrl} />
    <p class="weather-temp">${Math.round(data.main.temp)}&#176c</p>
    <p class="weather-city">${data.name}</p>
    `
    } catch (error) {
        console.error(error)
    }
});