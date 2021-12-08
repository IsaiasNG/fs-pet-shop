

let fs = require('fs')


const { exit, argv } = require('process');




if (argv[2] === 'read') {
    fs.readFile('./pets.json', 'utf-8', (err, fileData) => {
    let jsonData = JSON.parse(fileData);
    
    if(err) {
        console.error('Usage: node pets.js [read | create | update | destroy]')
        exit(1);
    } 

    if(argv[3]) {
        if (argv[3] < jsonData.length && argv[3] >= 0) {
            console.log(jsonData[argv[3]])
        } else {
            console.error('Usage: node pets.js read INDEX')
        }
        
    } else {
        console.log(jsonData)
    }
});
} else if (argv[2] === 'create'){

    if (argv[3] && argv[4] && argv[5]) {
        let fileData = fs.readFileSync('./pets.json')
        let jsonData = JSON.parse(fileData);

        let data = ({age: parseInt(argv[3]), kind: argv[4], name: argv[5]});
        jsonData.push(data)
        
        fs.writeFileSync('./pets.json', JSON.stringify(jsonData))
        console.log(jsonData)

    } else {
            console.error('Usage: node pets.js create AGE KIND NAME')
            exit(1);
    }    

} else if (argv[2] === 'update'){

    if (argv[3] && argv[4] && argv[5] && argv[6]) {
        let fileData = fs.readFileSync('./pets.json')
        let jsonData = JSON.parse(fileData);

        let data = ({age: parseInt(argv[4]), kind: argv[5], name: argv[6]});
        jsonData[argv[3]] = data;
        
        fs.writeFileSync('./pets.json', JSON.stringify(jsonData))
        console.log(jsonData)

    } else {
            console.error('Usage: node pets.js update INDEX AGE KIND NAME')
            exit(1);
    }    
} else if (argv[2] === 'destroy'){

    if (argv[3]) {
        let fileData = fs.readFileSync('./pets.json')
        let jsonData = JSON.parse(fileData);
        let destroyElement = jsonData.splice(argv[3], 1);
        console.log(destroyElement)
        console.log(' was deleted');
        fs.writeFileSync('./pets.json', JSON.stringify(jsonData))

    } else {
            console.error('Usage: node pets.js update INDEX AGE KIND NAME')
            exit(1);
    } 
} else {
    console.error('Usage: node pets.js [read | create | update | destroy]')
        exit(1);
}





    






