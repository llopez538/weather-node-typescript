import axios from "axios";
import * as fs from 'node:fs';
import { saveDB } from "../helpers/saveDB";

class Searchs {

  public history: string[] = [];
  public file: string = __dirname + '/../db/data.json';

  constructor() {
    // TODO: read DB is exists
    this.readDB();
  }

  get capitalizeHistory() {
    return this.history.map( place => {
      let words = place.split(' ');

      words = words.map( word => word[0].toUpperCase() + word.substring(1))

      return words.join(' ');
    })
  }

  get paramsMabox() {
    return {
      'proximity': "ip",
      'language': "es",
      'autocomplete': "true",
      'limit': 5,
      'access_token': process.env.MAPBOX,
    }
  }

  public paramsOpenWeather(lon: any, lat: any) {
    return {
      lon,
      lat,
      appid: process.env.OPEN_WEATHER_KEY,
      units: 'metric',
      lang: 'es'
    }
  }

  public async city(place: string = "") {
    try {
      // request http
      
      const instance = axios.create({
        baseURL: `https://api.mapbox.com`,
        params: this.paramsMabox
      })

      const response = await instance.get(`/geocoding/v5/mapbox.places/${place}.json?`);

      return response.data.features.map( (place: any) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
        
      }));
    } catch (error) {
      console.log(error);
    }
  }

  public async weatherPlace(lat: string|number, lng: string|number) {
    try {

      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org',
        params: this.paramsOpenWeather(lng, lat)
      });

      const response = await instance.get('/data/2.5/weather');

      const { weather, main, name } =  response.data      

      return {
        name,
        main: weather[0].main,
        description: weather[0].description,
        icon: weather[0].icon,
        temp: main.temp,
        feels_like: main.feels_like,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
        pressure: main.pressure,
        humidity: main.humidity,
      }
    } catch (error) {
      console.error(error);
    }
  }

  public save_history( place: string = '') {
    
    if (place !== '') {
      
      const result = this.history.includes( place );
      
      if (!result) {
        this.history = this.history.splice(0, 5);
        
        this.history.unshift(place.toLowerCase());
        
        this.saveDB();
      }
    }
  }
  
  public saveDB(): void {
    
    const payload = {
        history: this.history
    }

    fs.writeFileSync(this.file, JSON.stringify(payload))
  }

  public readDB(): Object | null {

    if (!fs.existsSync(this.file)) {
      return null;
    }

    const info = fs.readFileSync(this.file, {encoding: 'utf-8'});

    const data = JSON.parse(info);

    this.history =data.history

    return this.history;
  }
}

export default Searchs;
