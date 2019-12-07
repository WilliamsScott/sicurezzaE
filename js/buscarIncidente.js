const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var incidente2 = new Vue({
    el: "#incidente2",
    data: {
        window: remote.getCurrentWindow(),
        incidentes: [],
        con: remote.getGlobal("con")
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            fecha1 = form.fecha1.value
            fecha2 = form.fecha2.value
            this.con.connect(function () {

                incidente2.con.query("select * from incidente where fecha between ? and ?", [fecha1, fecha2], function (error, result) {
                    if (result.length == 0) {
                        incidente2.incidentes = []
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
        actualizar: function (id) {
            incidente2.con.query("update incidente set estado = 1, fecha2 = fecha where id=?", [id], function (error, result) {
                Swal.fire({
                    type: 'success',
                    title: 'Listo!',
                    text: 'Incidente actualizado!',
                })
                incidente2.incidentes = []
            })
        },
        formatDate: function (fecha) {
            var mes = fecha.getMonth() + 1
            var hora = fecha.getHours()
            var minutos = fecha.getMinutes()
            var segundos = fecha.getSeconds()
            var dia = fecha.getDate()
            mes = (mes > 9) ? mes : '0' + mes
            dia = (dia > 9) ? dia : '0' + dia
            minutos = (minutos > 9) ? minutos : '0' + minutos
            hora = (hora > 9) ? hora : '0' + hora
            segundos = (segundos > 9) ? segundos : '0' + segundos
            return dia + "-" + mes + "-" + fecha.getFullYear() + " " + hora + ":" + minutos + ":" + segundos
        },
        formatDate2: function (fecha2) {
            var mes = fecha2.getMonth() + 1
            var hora = fecha2.getHours()
            var minutos = fecha2.getMinutes()
            var segundos = fecha2.getSeconds()
            var dia = fecha2.getDate()
            mes = (mes > 9) ? mes : '0' + mes
            dia = (dia > 9) ? dia : '0' + dia
            minutos = (minutos > 9) ? minutos : '0' + minutos
            hora = (hora > 9) ? hora : '0' + hora
            segundos = (segundos > 9) ? segundos : '0' + segundos
            return dia + "-" + mes + "-" + fecha2.getFullYear() + " " + hora + ":" + minutos + ":" + segundos
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