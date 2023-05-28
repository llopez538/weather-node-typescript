import axios from "axios";


class Searchs {
    public history: string[] = ['Caracas', 'Bogota', 'Santiago de Chile', 'Madrid', 'Canada'];
    constructor() {
        // TODO: read DB is exists
    }

    public async city( place: string = '') {
        try {
            // request http 
            // console.log("city: ", place);
    
            const request = await axios.get('https://reqres.in/api/users?page=2');
    
            console.log(request.data);
            
            return []; // return match to the places' find
        } catch (error) {
            
            return [];
        }
        
    }
}

export default Searchs;