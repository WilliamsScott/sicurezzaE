const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")


var camara2 = new Vue({
    el: "#camara2",
    data: {
        window: remote.getCurrentWindow(),
        con: remote.getGlobal("con"),
        texto: "192.168.1.35",
    },
    methods: {
        verCamara: function () {
            var nueva = new BrowserWindow({
                webPreferences: { nodeIntegration: true },
                frame: false
            })
            nueva.loadURL("file://" + __dirname + "/verCamaraIp.html")
        },
        carga: function () {
            setInterval("carga()", 5);
            location.reload()
        },
        startInterval: function () {
            setInterval(() => {
                this.frame = frame + 1
            }, 100);
        },
        cerrarVentana: function () {
            this.window.close()
        },
        minimizarVentana: function () {
            this.window.minimize()
        },
        maximizarVentana: function () {
            this.window.maximize()
        },
        hola:function(){
            console.log("hola")
        }

    }

});



