const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var informee1 = new Vue({
    el: "#informee1",
    data: {
        window: remote.getCurrentWindow(),
        arreglo: [],
        arreglo2: [],
        arregloExcel1: [],
        arregloExcel2: [],
        visitas: [],
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    methods: {
        cargarGrafico: function () {
            this.con.connect(function () {
                informee1.con.query("select * from estacionamientovisita", function (error, result) {
                    result.forEach(function (dato) {
                        informee1.con.query("SELECT count(*) as total,numeroEstacionamiento FROM `vehiculovisita` join estacionamientovisita on vehiculovisita.numeroEstacionamiento=estacionamientovisita.numero where numero=?", [dato.numero], function (error, result) {
                            result.forEach(function (e) {
                                if (e.total > 0) {
                                    informee1.arreglo.push(e.total)
                                    informee1.arreglo2.push(e.numeroEstacionamiento )
                                }


                            })
                        })
                    })
                })
            })
        },
        estacionamientoxVeces: function () {
            this.con.connect(function () {
                informee1.con.query("SELECT count(*) as total ,numeroEstacionamiento FROM `vehiculovisita` join estacionamientovisita on vehiculovisita.numeroEstacionamiento=estacionamientovisita.numero group by estacionamientovisita.numero", function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Error',

                        })
                    } else {
                        result.forEach(function () {
                            informee1.arregloExcel1 = result
                        })

                    }
                })
            })
        }
    },

    mounted: function () {
        this.cargarGrafico()
        this.estacionamientoxVeces()
    }
});