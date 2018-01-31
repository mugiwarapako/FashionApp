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
	id_usuario: "1",
    id_modelo: "1",
    calf_arriba: "",
    calf_media: "",
    calf_bajo: ""
});

exports.loaded = function (args) {
	page = args.object;
	page.bindingContext = pageData;
	console.log("Calificar Modelo");
    pageData.id_usuario = "1";
    pageData.id_modelo = "1";
    pageData.calf_arriba = "";
    pageData.calf_media = "";
    pageData.calif_bajo = "";
}

exports.onSaveUser = function () {

    var userJson = { "id_usuario": pageData.id_usuario, "id_modelo": pageData.id_modelo, "calf_arriba": pageData.calf_arriba, "calf_media": pageData.calf_media, "calif_bajo": pageData.calif_bajo};

	// console.log("Verificar -----> " + pageData.name);
	if (verifyEmpty(pageData.name) && verifyEmpty(pageData.email) && verifyEmpty(pageData.phone)) {
	    userView.addCalif(userJson).catch(function () {
	        dialogsModule.alert({
	            message: "Ocurrio un error al calificar, consulte con su administrador.",
	            okButtonText: "Aceptar"
	        });
	    });
	    
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

exports.yesTop = function () {
    console.log("Si parte arriba");
    pageData.calf_arriba = "1";
    
}
exports.noTop = function () {
    console.log("no arriba");
    pageData.calf_arriba = "2";
}
exports.yesM = function () {
    console.log(" si media");
    pageData.calf_media = "1";
}
exports.noM = function () {
    console.log("no media");
    pageData.calf_media = "2";
}
exports.yesB = function () {
    console.log("si abajo");
    pageData.calif_bajo = "1";
}
exports.noB = function () {
    console.log("no abajo");
    pageData.calif_bajo = "2";
}






function verifyEmpty(field) {
	var flag = true;
	if (field === "") {
		flag = false;
	}
	return flag;
}