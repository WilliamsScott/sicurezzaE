const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var informev1 = new Vue({
    el: "#informev1",
    data: {
        window: remote.getCurrentWindow(),
        arreglo: [],
        arreglo2: [],
        arregloExcel1: [],
        arregloExcel2: [],
        visitas: [],
        con: remote.getGlobal("con")
    },
    methods: {
        cargarVisitas: function () {
            this.con.connect(function () {
                informev1.con.query("SELECT visita.rut,visita.nombre,visita.apellido,visita.telefono, visita.usuario, visita.fecha, vehiculovisita.patente, edificio.nombre as edificio, departamento.numero as departamento from visita left join vehiculovisita on visita.id=vehiculovisita.visita join edificio on edificio.id=visita.edificio join departamento on visita.departamento=departamento.id", function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Visitas no encontradas',

                        })
                    } else {
                        result.forEach(function (element) {
                            informev1.visitas = result
                            var fecha = new Date(result[0].fecha)
                            var f = result[0].fecha
                            fechaFinal = informev1.formatDate(f)
                        })

                    }
                })
            })
        },
        cargarGrafico: function () {
            this.con.connect(function () {
                informev1.con.query("select * from edificio", function (error, result) {
                    result.forEach(function (dato) {
                        informev1.con.query("select count(*) as total, edificio.nombre from visita join edificio on visita.edificio=edificio.id where edificio=?", [dato.id], function (error, result) {
                            result.forEach(function (e) {
                                informev1.arreglo.push(e.total)
                                informev1.arreglo2.push(e.nombre)
                            })
                        })
                    })
                })
            })
        },
        visitasxEdificio: function () {
            this.con.connect(function () {
                informev1.con.query("select * from edificio", function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Error',

                        })
                    } else {
                        result.forEach(function (element) {

                            informev1.con.query("select count(*) as total,edificio.nombre as edificio from visita join edificio on visita.edificio=edificio.id where edificio=1", function (error, result) {
                                result.forEach(function () {
                                    informev1.arregloExcel1 = result
                                })
                            })
                            informev1.con.query("select count(*) as total,edificio.nombre as edificio from visita join edificio on visita.edificio=edificio.id where edificio=2", function (error, result) {
                                result.forEach(function () {
                                    informev1.arregloExcel2 = result
                                })
                            })
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
        this.visitasxEdificio()
        this.cargarVisitas()
    }
});