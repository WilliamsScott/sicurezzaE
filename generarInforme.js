const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")


var informe1 = new Vue({
    el: '#informe1',
    data: {
        window: remote.getCurrentWindow(),
        visitas: [],
        vxe: [],
        vxe2: [],
        selected:'',
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    methods: {
        cargarVisitas: function () {
            this.con.connect(function () {
                informe1.con.query("SELECT visita.rut,visita.nombre,visita.apellido,visita.telefono, visita.usuario, visita.fecha, vehiculovisita.patente, edificio.nombre as edificio, departamento.numero as departamento from visita left join vehiculovisita on visita.id=vehiculovisita.visita join edificio on edificio.id=visita.edificio join departamento on visita.departamento=departamento.id", function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Dueño no encontrado',

                        })
                    } else {
                        result.forEach(function (element) {
                            informe1.visitas = result
                            var fecha = new Date(result[0].fecha)
                            var f = result[0].fecha
                            fechaFinal = informe1.formatDate(f)
                        })

                    }
                })
            })
        },
        visitasxEdificio: function () {
            this.con.connect(function () {
                informe1.con.query("select * from edificio", function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Dueño no encontrado',

                        })
                    } else {
                        result.forEach(function (element) {
                            //informe1.con.query("select count(*) as total,edificio.nombre as edificio from visita join edificio on visita.edificio=edificio.id where edificio=?", [element.id], function (error, result) {
                            // result.forEach(function () {
                            //    informe1.vxe = result

                            //})

                            // })
                            informe1.con.query("select count(*) as total,edificio.nombre as edificio from visita join edificio on visita.edificio=edificio.id where edificio=1", function (error, result) {
                                result.forEach(function () {
                                    informe1.vxe = result
                                })
                            })
                            informe1.con.query("select count(*) as total,edificio.nombre as edificio from visita join edificio on visita.edificio=edificio.id where edificio=2", function (error, result) {
                                result.forEach(function () {
                                    informe1.vxe2 = result
                                })
                            })
                        })

                    }
                })
            })
        },
        verSelect:function(){
            var select=document.getElementById("tipo")
            var x=select.value
            console.log(x)
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
        this.cargarVisitas()
        this.visitasxEdificio()
        this.verSelect()
    }
})