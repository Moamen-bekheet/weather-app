const form = document.querySelector('form');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const ouputDiv = document.createElement('div')
document.body.appendChild(ouputDiv);
async function getWeather(city){
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b49d59a13307ef96a62216e457b872c5&units=metric`);
        if(response.status === 404){
            throw new Error('No such city');
        }
        let dataObj = await getData(response);
        ouputDiv.textContent = ''
        for(let prop in dataObj){
            ouputDiv.textContent += `${prop}: ${dataObj[prop]} ----- `
        }
    }
    catch(error){
        ouputDiv.textContent = 'No such city'
    }
}
async function getData(response){
    let jsonFormattedData = await response.json();
    return {description: jsonFormattedData.weather[0].description, temperature: jsonFormattedData.main.temp, feelsLike: jsonFormattedData.main.feels_like}
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let value = input.value;
    getWeather(value);
})