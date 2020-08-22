import {Component} from 'react';
import axios from 'axios';

require('dotenv').config()



class Api extends Component{

    async getWeather(city){
        try{
            if(city){
                const weatherKey = process.env.REACT_APP_WEATHER_KEY
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`
                const response = await axios.get(url);
                return response;
            }
            else{
                city = "Madrid"
                const weatherKey =  process.env.REACT_APP_WEATHER_KEY
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`
                const response = await axios.get(url);
                return {"data": response, "city": city};
            }
            
        }
        catch{
            return false;
        }
        
    }

}

const api = new Api();

export default api;