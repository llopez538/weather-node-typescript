import colors from "colors";


const inquirer = require('inquirer');

const questions: Object[] =  [
    {
        type: 'list',
        name: 'option',
        message: 'What you want to do?',
        choices: [
            {
                value: 1,
                name:`${'1.'.yellow} Search City`
            },
            {
                value: 2,
                name:`${'2.'.yellow} History`
            },
            {
                value: 0,
                name:`${'0.'.yellow} Exit`
            }
        ]

    }
];

const enter = [
    {
        type: 'input',
        name: 'stop',
        message: `Click to ${colors.yellow('ENTER')} to continue \n`
    }
]


const inquirerMenu = async (): Promise<number> => {
    console.clear();
    
    console.log('==============================='.green);
    console.log('     Choose a option '.yellow);
    console.log('===============================\n'.green);

    const { option } = await inquirer.prompt(questions); 
    
    return option;
}

const stopInquirerMenu = async (): Promise<void> => {
    await inquirer.prompt(enter);
}

const readIput = async ( message: string = '' ): Promise<any> => {

    const questionInput = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value: any ) {
                if (value.length === 0) {
                    return 'Pleas insert a value';
                }
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(questionInput);
    return description;
}

const listPlaces = async (places: any = []) => {

    const choices = places.map( (keyWordPlace: any, i: number): Object => {
        const idx = `${ i + 1 }.`.yellow;
        return {
            value: keyWordPlace.id,
            name: `${idx} ${keyWordPlace.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.yellow + 'Cancel'
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Choose your place: ',
            choices 
        }
    ];

    const { id } = await inquirer.prompt(question); 

    return id;
    
}

const confirm = async ( message: string ): Promise<boolean> => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,

        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}


export {
    inquirerMenu,
    stopInquirerMenu,
    readIput,
    confirm,
    listPlaces,

};