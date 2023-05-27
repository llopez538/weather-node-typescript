class Searchs {
    public history: string[] = ['Caracas', 'Bogota', 'Santiago de Chile', 'Madrid', 'Canada'];
    constructor() {
        // TODO: read DB is exists
    }

    public async city( place: string = '') {
        
        // request http 
        console.log("Entre", place);

        return []; // return match to the places' find
        
    }
}

export default Searchs;