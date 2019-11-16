const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var test = new Vue({
    el: "#menuPrincipal",
    data: {
        window: remote.getCurrentWindow(),
        texto: "",
        bienvenido:"",
        estacionamientos: [],
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),

    },
    methods: {
        x: function () {
            this.texto = "hola"
        },
        nueva: function () {
            var nueva = new BrowserWindow({
                webPreferences: { nodeIntegration: true },
            })

            nueva.loadURL("file://" + __dirname + "/registrarResidente.html")
        },
        verCamara: function () {
            var verCamara = new BrowserWindow({
                webPreferences: { nodeIntegration: true },
            })

            verCamara.loadURL("file://" + __dirname + "/verCamara.html")
        },
        cargarEstacionamientos: function () {
            var tabla = document.getElementById("tbody")
            this.con.connect(function () {
                test.con.query("select * from estacionamientovisita", function (error, result) {
                    test.estacionamientos = result
                })
            })

        },
        storage: function () {
            if (typeof (Storage) !== 'undefined') {
                console.log("compatible")
            } else {
                console.log("no compatible")
            }
        },
        cargarBienvenido: function () {
            let bienvenido = localStorage.bienvenido
            this.bienvenido = bienvenido
            console.log(bienvenido)

        }


    },
    mounted: function () {
        this.cargarEstacionamientos()
        this.storage()
        this.cargarBienvenido()
    }
});