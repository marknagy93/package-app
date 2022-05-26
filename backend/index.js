const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

// A backend ezen a porton fut
const appPort = 8080;

// A futár mint admin
const courier = [
    {
        id: 1,
        username: "fonixcourier",
        password: "fonix0918",
    }
];

// A csomagok adatai
const packages = [
    {
        id: 1,
        size: "M",
        box: "A",
        deliverDate: "2022.05.24",
        deliverTime: "18:50",
        userid: "CSOMAG1",
        userpassword: "fonixcsomag1",
        useremail: "asd@asd.hu",
    }
];

// Endpoint a port lekérdezésére
app.get('/api/v1/packageapp/port', (req, res) => {
    res.send(`This app is running on this port: ${appPort}!`);
}); 

// Endpoint a csomagok lekérdezésére
app.get('/api/v1/packageapp/packages', (req, res) => {
    const sortedArray = packages.sort((first, second) => first.name < second.name ? 1 : -1);
    res.status(200).send(sortedArray);
});

// Endpoint az ügyfél belépésénél a megadott adatok alapján filterezett csomag adatainak visszaadásához
app.post('/api/v1/packageapp/login', (req, res) => {
    const filteredPackage = packages.filter(p => p.userid === req.body.user && p.userpassword === req.body.password);

    if(filteredPackage.length === 0) {
        res.status(403).send("Empty fields!");
    } else {
        res.status(200).send(filteredPackage);
    }
});

// Endpoint a futár mint adminként való belépéséhez
app.post('/api/v1/packageapp/adminlogin', (req, res) => {
    const filteredCouriers = courier.filter(c => c.username === req.body.user && c.password === req.body.password);

    if(filteredCouriers.length === 0) {
        res.status(403).send("Empty fields!");
    } else {
        res.status(200).send(filteredCouriers);
    }
});

// Endpoint az új csomagok felvételéhez
app.post('/api/v1/packageapp/packages', (req, res) => {
    checkingDetails({ req, res});
    packages.push({
        ...req.body,
        id: packages.length + 1,
    });

    res.status(200).send("The package creation was successfull!");

});

/* NEM FELHASZNÁLT ENDPOINT
app.put('/api/v1/packageapp/packages/:id', (req, res) => {
    checkingDetails({ req, res});

    const index = getPackage({ id: req.params.id });

    packages[index] = {
        ...packages[index],
        ...req.body,
    };

    res.status(200).send("The update was successfull!");
});
*/

/* NEM FELHASZNÁLT ENDPOINT
app.delete('/api/v1/packageapp/packages/:id', (req, res) => {
    checkingDetails({ req, res});

    const index = getPackage({ id: req.params.id });
    
    packages.splice(index, 1);

    res.status(200).send("The deletion of the package was successfull!");
})
*/

// Segédfüggvény az adatok átellenőrzéséhez. Ha req.params.id, akkor a létrehozott változóba tesszük az "idExist" mellékfüggvényünket ami egy ID-t vár, és a packages tömbbünkön find metódussal végigmegyünk egy darab package-el, és returnöljük. Ha nem idNotFoundError, akkor visszaküldjük response-ként hogy a megadott ID-val package nem található.
function checkingDetails({ req, res}) {
    if(req.params?.id) {
        const idNotFoundError = idExist({ id: req.params.id });
        !idNotFoundError && res.status(404).send("Package with the given id was not found!");
    }
};

// A fentebb említett segédfüggvény
function idExist({ id }) {
    return packages.find((package) => package.id === parseInt(id));
};

/* NEM FELHASZNÁLT SEGÉDFÜGGVÉNY
function getPackage({ id }) {
    const package = packages.find((package) => package.id === parseInt(id));
    return packages.indexOf(package);
};
*/

// app.listen endpoint, szükséges a listen metódus hívása, hogy a portunk aktív legyen indításkor, és fusson
app.listen(appPort, () => console.log("app is listening on port 8080!"));