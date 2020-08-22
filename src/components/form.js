import React,{Component} from 'react';
import './form.css'
import api from '../Api/api';

class WeatherForm extends Component{
    constructor(){
        super()

        this.state ={
            show: false,
            city:"",
            latitude:"",
            longitude:"",
            temperature:"",
            humidity:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        
    }

    handleChange(e){
        this.setState({city: e.target.value})
        
    }

    async handleSubmit(e){
        e.preventDefault();
        const city = this.state.city
        const response = await api.getWeather(city);

        
        if(response !== false ){
           
            if(response.city){
                this.setState({
                    city: response.city,
                    latitude: response.data.data.coord.lat,
                    longitude: response.data.data.coord.lon,
                    temperature: response.data.data.main.temp,
                    humidity: response.data.data.main.humidity,
                    show: true
                })
                document.getElementById("form").reset()
            }
            else{
                this.setState({
                    latitude: response.data.coord.lat,
                    longitude: response.data.coord.lon,
                    temperature: response.data.main.temp,
                    humidity: response.data.main.humidity,
                    show: true
                })
                document.getElementById("form").reset()
            }
            
            
        }
        else{
            alert("There was an error. Try again")
            document.getElementById("form").reset()
        }
       
    }

    render(){


        return(
            
            <div>
                <h1>Weather App</h1>

                <form id = "form" onSubmit={this.handleSubmit}>
                    <input type="text" className ="form-elements" id="cityInput" onChange={this.handleChange} autoFocus placeholder="City name..."/> {'\u00A0'}{'\u00A0'}
                    <input type="submit"  className ="form-elements" id="button" value="Send"/>
                </form>

                {this.state.show === true && (
                   
                       <div id="results-div">
                       <h2 className="results">Results</h2>
                        <h3 className="results">City: {this.state.city}</h3>
                        <h3 className="results">Temperature: {this.state.temperature} °C</h3>
                        <h3 className="results">Humidity: {this.state.humidity}</h3>
                        <h3 className="results">Latitude: {this.state.latitude}</h3>
                        <h3 className="results">Longitude: {this.state.longitude}</h3>
                       </div>

            
                )}
           
            </div>
    
        )
    }
}


export default WeatherForm;