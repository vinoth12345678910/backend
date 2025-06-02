const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);
    superagent.get(`https://dog.ceo/api/breeds/image/random/${data}`).end((err, res) => {

        console.log(res.body);
        fs.writeFile('dog-img.txt', res.body.message, err => {
            if (err) return console.log(err);
            console.log('Random dog image saved to file!');
        });
    
    })
})