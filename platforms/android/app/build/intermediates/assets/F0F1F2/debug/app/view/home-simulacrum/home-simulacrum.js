var dialogsModule = require("ui/dialogs");
var config = require("../../shared/config");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var cameraModule = require("nativescript-camera");
var imageSourceModule	= require("image-source");
var geolocation = require("nativescript-geolocation");
var enumsUI = require("ui/enums");
var flagLocation = 0;
var imagen;
var page;



var userView = new UserViewModel([]);
var pageData = new observableModule.fromObject({
	description : "",
	longitude : 0,
	latitude : 0,
	imagen : ''
});

exports.loaded = function (args) {
	flagLocation = 	 0;
    page = args.object;
	page.bindingContext = pageData;
	pageData.description = "";
	pageData.longitude = 0;
	pageData.latitude = 0;
	
	if (!geolocation.isEnabled()) {
		// HABILITAR PERMISOS DE UBICACION
		geolocation.enableLocationRequest()
			.then(function() {
			
			flagLocation = 1;

			// OBTENEMOS UBICACION ACTUAL
			var location = geolocation.getCurrentLocation({ desiredAccuracy: enumsUI.Accuracy.high, updateDistance: 10, timeout: 10000 })
				.then(function (loc) {
				if (loc) {
					pageData.longitude = loc.longitude;
					pageData.latitude = loc.latitude;
				};									
			}, function(error) {
				pageData.longitude = 0;
				pageData.latitude = 0;
			});
		});
	} else {
		if(flagLocation == 0) {
			
			var location = geolocation.getCurrentLocation({ desiredAccuracy: enumsUI.Accuracy.high, updateDistance: 5, timeout: 5000 })
				.then(function (loc) {
				if (loc) {
					pageData.longitude = loc.longitude;
					pageData.latitude = loc.latitude;
					
					};
			}, function (e) {
				console.log("Error location: " + e.message);
			});
		};
	};    

}

exports.onSaveUser = function () {

    var userJson = { "imagen": pageData.imagen, "longitude": pageData.longitude,"latitude" : pageData.latitude,"longitude" : pageData.description, "status" : 1, "descripcion":pageData.description};


	if (verifyEmpty(pageData.description) && verifyEmpty(pageData.imagen) && verifyEmpty(pageData.longitude)
			&& verifyEmpty(pageData.latitude) && verifyEmpty(pageData.description)) {
	    userView.addModel(userJson).catch(function () {
	        dialogsModule.alert({
	            message: "Ocurrio un error al agregar un usuario, consulte con su administrador.",
	            okButtonText: "Aceptar"
	        });
		});

		dialogsModule.alert({
	        message: "Modelo correctamente guardado.",
	        okButtonText: "Aceptar"
	    });

	    var topmost = frameModule.topmost();

    	// Opciones de la navegacion
    	var navigationOptions = {
        	moduleName: "view/home/home-page",
        	backstackVisible: false,
        	clearHistory: false,
        	animated: true,
        		transition: {
            		name: "slideLeft",
            		duration: 380,
            		curve: "easeIn"
        		}
    	};

    	// Navegamos a la vista indicada
    	topmost.navigate(navigationOptions);

	} else {
		dialogsModule.alert({
			title: "Aviso",
			message: "Es necesario llenar todos los campos",
			okButtonText: "Aceptar"
		}).then(function () {
			console.log("Di en aceptar");
		});
	}

    
}

exports.back = function () {
    var topmost = frameModule.topmost();

    // Opciones de la navegacion
    var navigationOptions = {
        moduleName: "view/home/home-page",
        backstackVisible: false,
        clearHistory: false,
        animated: true,
        transition: {
            name: "slideLeft",
            duration: 380,
            curve: "easeIn"
        }
    };

    // Navegamos a la vista indicada
    topmost.navigate(navigationOptions);
}

// PERMISOS DE LA CAMARA
exports.onRequestPermissionsTap = function (args)
{
	// Validar si hay camara
	var isAvailable = cameraModule.isAvailable();

	console.log("isAvailable: " + isAvailable);

	// Opciones de la camara
	var options = { width: 150, height: 150, keepAspectRatio: true, saveToGallery: false };

	// VALIDAMOS SI HAY CAMARA O NO
	if (isAvailable) {
		// Solicitar permiso de camara
		cameraModule.requestPermissions();
		// Tomar Foto
		cameraModule.takePicture(options)
			.then(function (imageAsset) {

				// DESDE LA IMAGEN
					imageSourceModule.fromAsset(imageAsset).then(function (res) {
					// ASIGNAMOS EL BASE64 DE LA IMAGEN
					pageData.imagen = "data:image/png;base64,"+res.toBase64String("jpeg");
				});
			}).catch(function (err) {
				console.log("Error -> " + err.message);
			});
	}else {
		alert("Tu dispositivo no cuenta con camara");
	};
};

function verifyEmpty(field) {
	var flag = true;
	if (field === "") {
		flag = false;
	}
	return flag;
}