import axios from "axios";

class Searchs {
  public history: string[] = [
    "Caracas",
    "Bogota",
    "Santiago de Chile",
    "Madrid",
    "Canada",
  ];
  constructor() {
    // TODO: read DB is exists
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
}

export default Searchs;
