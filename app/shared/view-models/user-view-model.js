var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");

function UserViewModel(items) {

    var viewModel = new ObservableArray(items);


    viewModel.add = function (userData) {
        console.log("JSON ----*****---> " + JSON.stringify(userData));
        console.log("a la url   ***---> " + config.apiUrl + "user/addUser");
        return fetch(config.apiUrl + "user/addUser", {
            method: "POST",
            body: JSON.stringify({
                nombre: userData.nombre,
                telefono: userData.telefono,
                correo: userData.correo
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {

                
            //data.response.forEach(function (client) {
            //    console.log("Nombre ----> " + client.alias);
            //});
        });
    };

    viewModel.addCalif = function (userData) {
        console.log("JSON ----*****---> " + JSON.stringify(userData));
        console.log("apiUrl *****---> " + config.apiUrl + "userModels/addUserModel");
        return fetch(config.apiUrl + "userModels/addUserModel", {
            method: "POST",
            body: JSON.stringify({
                id_usuario: userData.id_usuario,
                id_modelo: userData.id_modelo,
                calf_arriba: userData.calf_arriba,
                calf_media: userData.calf_media,
                calif_bajo: userData.calif_bajo
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {


                //data.response.forEach(function (client) {
                //    console.log("Nombre ----> " + client.alias);
                //});
            });
    };


    viewModel.addEvent = function (userData) {
        console.log("JSON -------> " + JSON.stringify(userData));
        console.log("NOMBRE QUE LE MANDO DEL JS --------------->" );
        return fetch(config.apiUrl + "event/addEvent", {
            method: "POST",
            body: JSON.stringify({

                nombreEvento: userData.nombreEvento,
                direccion: userData.direccion,
                fecha: userData.fecha,
                numeroLugares: userData.numeroLugares
                
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {


                //data.response.forEach(function (client) {
                //    console.log("Nombre ----> " + client.alias);
                //});
            });
    };

    viewModel.getListModels = function (userData) {
        console.log("************" + userData.id_evento);
        console.log("JSON -------> " + JSON.stringify(userData));
        console.log("NOMBRE QUE LE MANDO DEL JS --------------->" +config.apiUrl + "models/listModelByEvent" );
        return fetch(config.apiUrl + "models/listModelByEvent", {
            method: "POST",
            body: JSON.stringify({
                id_evento: userData.id_evento,
                status: userData.status
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.dir(data);
                return data;
            });
    };


    viewModel.chengeStatus = function (userData) {
        console.log("JSON -------> " + JSON.stringify(userData));
        console.log("NOMBRE QUE LE MANDO DEL JS --------------->" +config.apiUrl + "models/changeStatus" );
        return fetch(config.apiUrl + "models/changeStatus", {
            method: "POST",
            body: JSON.stringify({
                id : userData.id,
                status : userData.status
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.dir(data);
                return data;
            });
    };
    

    viewModel.addModel = function (userData) {
        console.log("JSON ----*****---> " + JSON.stringify(userData));
        console.log("apiUrl *****---> " + config.apiUrl + "models/addModels");
        return fetch(config.apiUrl + "models/addModels", {
            method: "POST",
            body: JSON.stringify({
                descripcion: userData.description,
                imagen: userData.imagen,
                latitud: userData.latitude,
                status: userData.status,
                longitud: userData.longitude,
                descripcion:userData.descripcion
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {


                //data.response.forEach(function (client) {
                //    console.log("Nombre ----> " + client.alias);
                //});
            });
    };

    viewModel.getNextModel = function (userData) {
        console.log("JSON -------> " + JSON.stringify(userData));
        console.log("NOMBRE QUE LE MANDO DEL JS --------------->" +config.apiUrl + "models/next" );
        return fetch(config.apiUrl + "models/next", {
            method: "POST",
            body: JSON.stringify({
                id_evento: userData.id_evento,
                status: userData.status,
                id: userData.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.dir(data);
                return data;
            });
    };

    

    
    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = UserViewModel;