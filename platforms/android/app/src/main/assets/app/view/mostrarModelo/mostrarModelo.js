var dialogsModule = require("ui/dialogs");
var config = require("../../shared/config");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var page;

var array = new ObservableArray();
var userView = new UserViewModel([]);
var pageData = new observableModule.fromObject({
    text : "ola",
    listModels : userView
});

exports.onPageLoaded = function (args) {
    array = new ObservableArray();

    pageData = new observableModule.fromObject({
        text : "ola",
        listModels : userView
    });

    var userJson = {"id_evento": 11,status:1};
    console.log(pageData.text);
    
    page = args.object;
    
    pageData.set("isLoading", true);


    var listView = page.getViewById("listModels");
	userView.getListModels(userJson).then(function (data) {
        
        array.push(data.response);
        pageData.set("isLoading", false);
        pageData.listModels = data.response;
        page.bindingContext = {listModels: array};
        
        console.log("*********************");
        
    }).catch(function (error) {
        pageData.set("isLoading", false);
        console.log(error);
        dialogsModule.alert({
            message: "No pude procesar la petición.",
            okButtonText: "OK"
        });
        return Promise.reject();
    });
}

function list(){

    

}

function verifyEmpty(field) {
    var flag = true;
    if (field === "") {
        flag = false;
    }
    return flag;
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



exports.onSaveUser = function () {

    console.log("*********************");
    console.dir(pageData.listModels);
    console.log("*********************");
}


exports.listViewItemTap = function (args) {
    var item = args.view.bindingContext;
    var index = pageData.listModels.indexOf(item);



    dialogsModule.confirm({
        title: "Aviso",
        message: "\u00BFQuieres publicar este modelo?",
        okButtonText: "Si",
        cancelButtonText: "No",
    }).then(function (result) {
        if (result) {

            var userJson = {"id": item.id, status:2};
            userView.chengeStatus(userJson).then(function (data) {
                
                dialogsModule.alert({
                    message: "Modelo publicado.",
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
                
            }).catch(function (error) {
                dialogsModule.alert({
                    message: "No pude procesar la petición.",
                    okButtonText: "OK"
                });
            });
        }
    });

}

exports.onSelectedIndexChanged = function (args) {
    console.log("Estoy en index ---> " + args.newIndex);
    //switch (args.newIndex) {
    //    case 0:
    //        pageData.enabledCreate = true;
    //        loadList();
    //        break;
    //    case 1:
    //        pageData.enabledCreate = false;
    //        loadList();
    //        break;
    //    default:
    //        console.log("Esta acción no esta disponible");
    //        break;
    //}
}