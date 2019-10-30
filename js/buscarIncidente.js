const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var incidente2 = new Vue({
    el: "#incidente2",
    data: {
        window: remote.getCurrentWindow(),
        incidentes: [],
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            fecha1 = form.fecha1.value
            fecha2 = form.fecha2.value
            this.con.connect(function () {

                incidente2.con.query("select * from incidente where fecha between ? and ?", [fecha1, fecha2], function (error, result) {
                    if(result.length==0){
                        incidente2.incidentes =[]
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'No se encontraron incidentes',
    
                        })
                    }
                    result.forEach(function () {
                        incidente2.incidentes = result
                    })
                })

            })
        },
        ver: function (descripcion) {
            Swal.fire({
                text: descripcion
            })
        },
        formatDate: function (fecha) {
            var mes = fecha.getMonth() + 1
            var hora = fecha.getHours()
            var minutos = fecha.getMinutes()
            var segundos = fecha.getSeconds()
            return fecha.getDate() + "-" + mes + "-" + fecha.getFullYear() + " " + hora + ":" + minutos + ":" + segundos
        },
        paginacion: function () {
            this.con.connect(function () {
                visita2.con.query("SELECT count(*) FROM visita", function (error, result) {
                    var total = result
                    visita2.con.query("SELECT * FROM visita limit 0,3")
                })

            })
        }
    }


});