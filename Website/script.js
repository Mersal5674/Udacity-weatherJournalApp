
// Adding the apikey
const apiKey = ",&appid=&units=metric";
// adding the baseurl
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Local server we are using
const server = "http://localhost:3000/";

// declaring the catch error function which shall be used later
const catchError = (error) => console.error('', error);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+( d.getMonth() + 1)+'.'+ d.getFullYear();

// async which is wait for the zipCode to be fitched first
const getData = async(baseUrl,zip,apiKey) => {
    const feelings = document.getElementById('Feelings_holder').value;
    // putting them in an order is important according to the 
    // http you shall follow
    try{
        const res = await fetch(baseUrl+zip+apiKey);
        const data = await res.json();
        /* console.log(data);
        return data; */
        const {name} = data;
        const {temp,humidity} = data.main;
        const {icon,description} = data.weather[0];
        const {speed} = data.wind;
        const info = {name,temp,humidity,icon,description,speed,feelings,zip};
        /* console.log(info);
        return info; */

        /* we call the funaction of posting data to the server after
        declaring it bellow so we can post info to the server */
        postDataToServer(info);

    } catch(error){
        catchError();
    }
}

/* Post Data To Server For Saving  */
async function postDataToServer(data) {
    /* we used `${server}weather` to fetch specific part of
    our server which is the poat method */
    let res = await fetch(`${server}weather`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!res.ok) {
            alert('Process Failed');
            return;
        }
        /* Now we are catching the 'res' sent by server.js */
        res.json().then(data => {
            if (res.ok)
                updateUI();
            else
                alert('Process Failed');
        }).catch(catchError);

    } catch (error) {
        catchError(error);
    }
}

/* updateUI */
async function updateUI() {
    let res = await fetch(`${server}getAll`);
    try {
        /* Now we are catching the 'res' sent by server.js */
        res.json().then(data => {
            /* console.log(data); */
            document.querySelector('.city').innerHTML = `Weather in: ${data.name}`;
            document.querySelector('.temp').innerHTML = `${data.temp}°C`;
            document.querySelector('.icon').src =`http://openweathermap.org/img/wn/${data.icon}.png`;
            document.querySelector('.description').innerHTML= `${data.description}`;
            document.querySelector('.humidity').innerHTML= `Humidity: ${data.humidity}%`;
            document.querySelector('.wind').innerHTML= `Wind speed: ${data.speed}Km`;
            document.querySelector('.feelings').innerHTML= `Your feelings: ${data.feelings}`;
            document.querySelector('.date').innerHTML= `Date: ${newDate}`;
        }).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}

// creating the search function with the help of getData we just build
const search = () => {
    const zip = document.getElementById("ZIP_holder").value;  
    getData(baseUrl,zip,apiKey);
};


// creating a listenning function to get what entered in the input area
document.getElementById('generate').addEventListener('click', search);
