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
	id_usuario: "",
    id_modelo: "",

    calf_arriba: "",
    calf_media: "",
    calf_bajo: "",

    botonSiA: "",
    botonNoA: "",

    botonSiM: "",
    botonNoM: "",

    botonSiB: "",
    botonNoB: "",

    imgen:""
    
});

exports.loaded = function (args) {
    
    page = args.object;
	page.bindingContext = pageData;

    console.log("Calificar Modelo");
    pageData.id_usuario = "1";
    pageData.id_modelo = "1";
    pageData.calf_arriba = "0";
    pageData.calf_media = "0";
    pageData.calif_bajo = "0";

    pageData.botonSiA = "~/images/MeGusta.png";
    pageData.botonNoA = "~/images/NoMegusta.png";
    pageData.botonSiM = "~/images/MeGusta.png";
    pageData.botonNoM = "~/images/NoMegusta.png";
    pageData.botonSiB = "~/images/MeGusta.png";
    pageData.botonNoB = "~/images/NoMegusta.png";
    pageData.imgen = "~/images/modelo.jpg";
    //
//
    //array = new ObservableArray();
//
    //pageData = new observableModule.fromObject({
    //    listModels : userView
    //});
//
    //var userJson = {"id_evento": 11,status:2, id: 0};
    //
    //page = args.object;
    //
	//userView.getNextModel(userJson).then(function (data) {
    //    
    //    array.push(data.response);
//
    //    console.log("*********************");
    //    //console.dir(data.response);
    //    console.log("*********************");
    //    console.dir(data.response.status);
//
    //    if(data.response.status === true){
    //        console.log("*********************");
    //        pageData.imgen = data.response.modelo[0].imagen;
    //        console.log("*********************");
    //        console.log(pageData);
    //    }
    //    
    //    
    //}).catch(function (error) {
    //    pageData.set("isLoading", false);
    //    console.log(error);
    //    dialogsModule.alert({
    //        message: "No pude procesar la petición.",
    //        okButtonText: "OK"
    //    });
    //    return Promise.reject();
    //});
//
//
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
        });
    }

    dialogsModule.alert({
            message: "Se envio la calificación correctamente.",
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
    pageData.botonSiA = "~/images/MeGustaOnPress.png";
    pageData.botonNoA = "~/images/NoMegusta.png";
    pageData.calf_arriba = "1";
}
exports.noTop = function () {
    pageData.botonSiA = "~/images/MeGusta.png";
    pageData.botonNoA = "~/images/NoMegustaOnPress.png";
    pageData.calf_arriba = "2";
}
exports.yesM = function () {
    pageData.botonSiM = "~/images/MeGustaOnPress.png";
    pageData.botonNoM = "~/images/NoMegusta.png";
    pageData.calf_media = "1";
}
exports.noM = function () {
    pageData.botonSiM = "~/images/MeGusta.png";
    pageData.botonNoM = "~/images/NoMegustaOnPress.png";
    pageData.calf_media = "2";
}
exports.yesB = function () {
    pageData.botonSiB = "~/images/MeGustaOnPress.png";
    pageData.botonNoB = "~/images/NoMegusta.png";
    pageData.calif_bajo = "1";
}
exports.noB = function () {
    pageData.botonSiB = "~/images/MeGusta.png";
    pageData.botonNoB = "~/images/NoMegustaOnPress.png";
    pageData.calif_bajo = "2";
}

function verifyEmpty(field) {
	var flag = true;
	if (field === "") {
		flag = false;
	}
	return flag;
}


function cargar(){
	
}