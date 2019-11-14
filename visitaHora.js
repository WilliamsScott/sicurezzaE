const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var informev3 = new Vue({
    el: "#informev3",
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
                informev3.con.query("SELECT hour(fecha) as hora FROM `visita` GROUP by hour(fecha)", function (error, result) {
                    result.forEach(function (dato) {
                        informev3.con.query("select count(*) as total, hour(fecha) as hora from visita where hour(fecha)=? ", [dato.hora], function (error, result) {
                            result.forEach(function (e) {

                                informev3.arreglo.push(e.total)
                                if (e.hora < 10) {
                                    informev3.arreglo2.push('0'+e.hora)
                                }else{
                                    informev3.arreglo2.push(e.hora)
                                }




                            })
                        })
                    })
                })
            })
        },
        visitasxHora: function () {
            this.con.connect(function () {
                informev3.con.query("SELECT count(*) as total, hour(fecha) as hora FROM `visita` WHERE HOUR(fecha) BETWEEN 0 and 23 GROUP by HOUR(fecha)", function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Error',

                        })
                    } else {
                        result.forEach(function () {
                            informev3.arregloExcel1 = result
                        })

                    }
                })
            })
        },
        formatDate: function (fecha) {
            var mes = fecha.getMonth() + 1
            var hora = fecha.getHours()
            var minutos = fecha.getMinutes()
            var segundos = fecha.getSeconds()
            return fecha.getDate() + "-" + mes + "-" + fecha.getFullYear() + " " + hora + ":" + minutos + ":" + segundos
        },
    },

    mounted: function () {
        this.cargarGrafico()
        this.visitasxHora()
    }
});