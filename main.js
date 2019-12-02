const app = require("electron").app;
const BrowserWindow = require("electron").BrowserWindow;
const mysql = require("mysql");
app.on("ready", function () {
    var window = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
        //PARA QUITAR LA BARRA //
        frame:false 

    });
    window.maximize()
    window.loadURL("file://" + __dirname + "/index.html")

});
global.con = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    database: "sic2"
})