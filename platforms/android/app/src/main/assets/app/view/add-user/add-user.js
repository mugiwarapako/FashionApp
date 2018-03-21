var dialogsModule = require("ui/dialogs");
var config = require("../../shared/config");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var page;


var userView = new UserViewModel([]);
var pageData = new observableModule.fromObject({
	name: "",
	email: "",
	phone: ""
});

exports.loaded = function (args) {
	page = args.object;
	page.bindingContext = pageData;
	console.log("Cargue la actividad para agregar un usuario");
	pageData.name = '';
	pageData.email = '';
	pageData.phone = '';
}

exports.onSaveUser = function () {

    var userJson = { "nombre": pageData.name, "correo": pageData.email, "telefono": pageData.phone };

	// console.log("Verificar -----> " + pageData.name);
	if (verifyEmpty(pageData.name) && verifyEmpty(pageData.email) && verifyEmpty(pageData.phone)) {
	    userView.add(userJson).catch(function () {
	        dialogsModule.alert({
	            message: "Ocurrio un error al agregar un usuario, consulte con su administrador.",
	            okButtonText: "Aceptar"
	        });
	    });

	    dialogsModule.alert({
	        message: "Usuario correctamente guardado.",
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

function verifyEmpty(field) {
	var flag = true;
	if (field === "") {
		flag = false;
	}
	return flag;
}