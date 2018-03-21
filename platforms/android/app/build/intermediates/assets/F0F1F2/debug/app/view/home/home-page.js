/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
var frameModule = require("ui/frame");
var dialogsModule = require("ui/dialogs");
var config = require("../../shared/config");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");
var UserViewModel = require("../../shared/view-models/user-view-model");
var Toast = require("nativescript-toast");

var page;
var toast;
var userView = new UserViewModel([]);

var pageData = new observableModule.fromObject({
});
//var HomeViewModel = require("./home-view-model");

//var homeViewModel = new HomeViewModel();

function onNavigatingTo(args) {

    if (appSettings.getBoolean("message") === undefined) {
        dialogsModule.alert({
            title: "Información",
            message: "Fashion es una herramienta para pasarelas. © 2018 IOFractal.",
            okButtonText: "Aceptar"
        }).then(function () {
            appSettings.setBoolean("message", true);
        });
    }
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = pageData;
}

exports.individual = function () {

    var topmost = frameModule.topmost();

    // Opciones de la navegacion
    var navigationOptions = {
        //moduleName: "view/home-client/home-client",
        moduleName: "view/add-user/add-user",
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

exports.macro = function () {

    var topmost = frameModule.topmost();

    // Opciones de la navegacion
    var navigationOptions = {
        moduleName: "view/home-simulacrum/home-simulacrum",
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

exports.group = function () {

    console.log("Folio ingresado ----> ");
    var topmost = frameModule.topmost();

    // Opciones de la navegacion
    var navigationOptions = {
        moduleName: "view/calificacion/calificacion",
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

exports.models = function () {

    var topmost = frameModule.topmost();

    // Opciones de la navegacion
    var navigationOptions = {
        //moduleName: "view/home-client/home-client",
        moduleName: "view/mostrarModelo/mostrarModelo",
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



exports.onNavigatingTo = onNavigatingTo;