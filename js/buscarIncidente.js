const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var incidente2 = new Vue({
    el: "#incidente2",
    data: {
        window: remote.getCurrentWindow(),
        incidentes: [],
        f1: "",
        f2: "",
        mostrarBoton: false,
        paginaA: 1,
        totalPaginacion: "",
        con: remote.getGlobal("con")
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            fecha1 = document.getElementById("fecha1").value
            fecha2 = document.getElementById("fecha2").value
            this.con.connect(function () {
                incidente2.con.query("select * from incidente where fecha between ? and ?", [fecha1, fecha2], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'No se encontraron incidentes',
                        })
                        incidente2.incidentes = []
                        incidente2.f1 = ""
                        incidente2.f2 = ""
                        incidente2.paginacion()
                    } else {
                        result.forEach(function () {
                            incidente2.f1 = fecha1
                            incidente2.f2 = fecha2
                            incidente2.paginacion(1)
                        })
                    }

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
        paginacion: function (actual) {
            this.paginaA = actual
            this.con.connect(function () {
                incidente2.con.query("select count(*) as total from incidente where fecha between ? and ?", [incidente2.f1, incidente2.f2], function (error, result) {
                    var total = result[0].total
                    total2 = (total / 5).toFixed()
                    resto = ((total / 5).toFixed(2) - (total / 5).toFixed())
                    if (resto > 0 && resto < 5) {
                        incidente2.totalPaginacion = parseInt(total2) + parseInt(1)
                        console.log(incidente2.totalPaginacion)
                    } else {
                        incidente2.totalPaginacion = parseInt(total2)
                    }
                })
                incidente2.con.query("select * from incidente where fecha between ? and ? limit ? , ?", [incidente2.f1, incidente2.f2, (actual - 1) * 5, 5], function (error, result) {
                    incidente2.incidentes = result
                })

            })
        },
    },
    mounted: function () {
        this.paginacion()
    }


});