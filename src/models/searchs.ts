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

  public async city(place: string = "") {
    try {
      // request http
      
      const instance = axios.create({
        baseURL: `https://api.mapbox.com`,
        params: {
            'proximity': "ip",
            'language': "es",
            'autocomplete': "true",
            'access_token': "pk.eyJ1IjoibGVvbmFyZGxtNTM4IiwiYSI6ImNsaThjbGR3YzFncHYzbnFwbWJxdjNqaHUifQ.qeVvtuDcvELNVEkQeEmVig",
        }
      })

    //   instance.defaults.headers.common['Authorization'] = "pk.eyJ1IjoibGVvbmFyZGxtNTM4IiwiYSI6ImNsaThjbGR3YzFncHYzbnFwbWJxdjNqaHUifQ.qeVvtuDcvELNVEkQeEmVig";

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
