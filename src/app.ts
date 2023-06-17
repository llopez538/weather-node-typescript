import { inquirerMenu, listPlaces, readIput, stopInquirerMenu } from "./helpers/inquirerMenu";
import Searchs from "./models/searchs";
import * as dotenv from 'dotenv'
dotenv.config();

const main = async (): Promise<void> => {
    
    const searchs = new Searchs(); 
    let opt: number;
    
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:

            //* Show message
            const keyWordSearch = await readIput('Enter the place to find');
            
            //* Search places
            const places = await searchs.city(keyWordSearch);
            
            //* Choice place
            const choosedId = await listPlaces(places);

            const {id, name, lng, lat } = places.find( (keyWordPlace: any) => keyWordPlace.id === choosedId);
            
            //* Weather
            //* Show result
                
                console.log("\nInformation about the City\n".yellow);
                console.log("City: ".blue, name);
                console.log("Lat: ".blue, lat);
                console.log("Log: ".blue, lng);
                console.log("Temperature: ".blue, );
                console.log("Minimum: ".blue, );
                console.log("Maximum: ".blue, );
                
                
                break;
            case 2:
                
                break;
            case 0:
                
                break;
        
            default:
                break;
        }

        if (opt>0) await stopInquirerMenu();
        
    } while (opt > 0);
    
}

main();