const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var header = new Vue({
    el: "#header",
    data: {
        window: remote.getCurrentWindow(),
        mostrar:"",
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
        

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
            console.log("caca")
        },
        cargarBienvenido:function(){
            let bienvenido = localStorage.bienvenido
            mostrar=bienvenido
            console.log(mostrar)
            
        }
    },
    mounted:function(){
        this.cargarBienvenido()
    }

});



