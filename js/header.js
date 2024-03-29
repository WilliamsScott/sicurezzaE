const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var header = new Vue({
    el: "#header",
    data: {
        window: remote.getCurrentWindow(),
        bienvenido:"",
        con: remote.getGlobal("con")
        

    },
    methods: {
        cerrarVentana: function () {
            this.window.close()
        },
        minimizarVentana: function () {
            this.window.minimize()
        },
        maximizarVentana: function () {
            this.window.maximize()
        },
        cerrarSesion:function(){
            let user = localStorage.user
            localStorage.removeItem(user)
            header.window.loadURL("file://" + __dirname + "/index.html")
            
        },
        cargarBienvenido:function(){
            let bienvenido = localStorage.bienvenido
            this.bienvenido=bienvenido
            console.log(bienvenido)
            
        }
    },
    mounted:function(){
        this.cargarBienvenido()
    }

});



