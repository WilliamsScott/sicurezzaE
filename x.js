const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var x = new Vue({
    el: "#x",
    data: {
        window: remote.getCurrentWindow(),
        arreglo: [],
        arreglo2: [],
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    methods: {
        cargarGrafico: function () {
            var select = document.getElementById("sobre")
            console.log(select.value)
            this.con.connect(function () {
                x.con.query("select * from edificio", function (error, result) {
                    result.forEach(function (dato) {
                        x.con.query("select count(*) as total, edificio.nombre from residente join edificio on residente.edificio=edificio.id where edificio=?", [dato.id], function (error, result) {
                            result.forEach(function (e) {
                                console.log(e.total)
                                x.arreglo.push(e.total)
                                x.arreglo2.push(e.nombre)
                            })
                        })
                    })
                })
            })
        },
        cargarGrafico2: function () {
            var select = document.getElementById("sobre")
            console.log(select.value)

            x.arreglo = []
            x.arreglo2 = []
            this.con.connect(function () {
                x.con.query("select * from edificio", function (error, result) {
                    result.forEach(function (dato) {
                        x.con.query("select count(*) as total, edificio.nombre from visita join edificio on visita.edificio=edificio.id where edificio=?", [dato.id], function (error, result) {
                            result.forEach(function (e) {
                                console.log(e.total)
                                x.arreglo.push(e.total)
                                x.arreglo2.push(e.nombre)
                            })
                        })
                    })
                })
            })

        },
    },
    mounted: function () {
        this.cargarGrafico()
        this.cargarGrafico2()
    }
});