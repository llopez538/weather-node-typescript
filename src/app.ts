import { inquirerMenu, readIput, stopInquirerMenu } from "./helpers/inquirerMenu";
import Searchs from "./models/searchs";

const main = async (): Promise<void> => {

    const searchs = new Searchs(); 
    let opt: number;

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:

            //* Show message
            const place = await readIput('Enter the place to find');
            console.log(place);
            
            // searchs.city(place)
            
            //* Search places
            //* Choice place
            //* Weather
            //* Show result
                
                console.log("\nInformation about the City\n".yellow);
                console.log("City: ".blue, );
                console.log("Lat: ".blue, );
                console.log("Log: ".blue, );
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