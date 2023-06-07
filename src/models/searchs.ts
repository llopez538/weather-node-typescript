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

  public async city(place: string = "") {
    try {
      // request http
      
      const instance = axios.create({
        baseURL: `https://api.mapbox.com`,
        params: this.paramsMabox
      })

      const response = await instance.get(`/geocoding/v5/mapbox.places/${place}.json?`);

      console.log("Hola", response.data);

      return []; // return match to the places' find
    } catch (error) {
      console.log(error);
      ;
    }
  }
}

export default Searchs;
