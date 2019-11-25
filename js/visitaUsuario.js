const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var informev2 = new Vue({
    el: "#informev2",
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
        cargarGrafico: function () {
            this.con.connect(function () {
                informev2.con.query("select * from usuario", function (error, result) {
                    result.forEach(function (dato) {
                        informev2.con.query("select count(*) as total, usuario.nombre, usuario.apellido from visita join usuario on visita.usuario=usuario.rut where usuario=?", [dato.rut], function (error, result) {
                            result.forEach(function (e) {
                                if (e.total > 0) {
                                    informev2.arreglo.push(e.total)
                                    informev2.arreglo2.push(e.nombre + " " + e.apellido)
                                }


                            })
                        })
                    })
                })
            })
        },
        visitasxUsuario: function () {
            this.con.connect(function () {
                informev2.con.query("SELECT usuario.nombre,usuario.apellido, IFNULL(total, 0) as total FROM usuario LEFT JOIN ( select usuario.rut, count(*) as total, usuario.nombre, usuario.apellido from visita join usuario on visita.usuario=usuario.rut group by usuario.rut ) Q1 ON usuario.rut = Q1.rut", function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Error',

                        })
                    } else {
                        result.forEach(function () {
                            informev2.arregloExcel1 = result
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
        this.visitasxUsuario()
    }
});