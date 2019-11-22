const app = require("electron").app;
const BrowserWindow= require("electron").BrowserWindow;
app.on("ready", function(){
    var window= new BrowserWindow({
        webPreferences:{nodeIntegration:true},
        //PARA QUITAR LA BARRA //
        frame:false 
        
    });
    window.maximize()
    window.loadURL("file://"+__dirname+"/index.html")
});