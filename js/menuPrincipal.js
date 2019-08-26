const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var test = new Vue({
    el: "#menuPrincipal",
    data: {
        window: remote.getCurrentWindow(),
        texto: "",
        e1: "",
        e2: "",
        i: 0,
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
                    result.forEach(function (dato) {
                        var tr = document.createElement("tr")
                        var td = document.createElement("td")
                        var td2 = document.createElement("td")
                        var numero = document.createTextNode(dato.numero)

                        td.appendChild(numero)
                        tr.appendChild(td)
                        tabla.appendChild(tr)

                        var x = dato.estado
                        if (x == 0) {
                            var estado = document.createTextNode("Disponible")
                            td2.appendChild(estado)
                            tr.appendChild(td2)
                            tabla.appendChild(tr)
                        } else {
                            var estado = document.createTextNode("Ocupado")
                            td2.appendChild(estado)
                            tr.appendChild(td2)
                            tabla.appendChild(tr)
                        }




                    })
                })
            })

        }


    },
    mounted:function(){
        this.cargarEstacionamientos()
    }
});