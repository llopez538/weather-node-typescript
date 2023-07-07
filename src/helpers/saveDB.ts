import * as fs from 'node:fs';

const file: string = __dirname + '/../db/data.json';

const saveDB: any = (data: any): void => {
    
    const payload = {
        history: data
    }
    fs.writeFileSync(file, JSON.stringify(payload))
}

export {
    saveDB
}