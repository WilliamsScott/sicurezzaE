const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")


var visita2 = new Vue({
    el: "#visita2",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        est: "",
        tip: "",
        rut: "",
        visitas: [],
        rrr:"",
        f1:"",
        f2:"",
        mostrarBoton:false,
        paginaA:1,
        visitasPaginacion: [],
        totalPaginacion: "",
        con: remote.getGlobal("con")
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()

            rut = document.getElementById("rut").value
            fecha1 = document.getElementById("fecha1").value
            fecha2 = document.getElementById("fecha2").value
            buscarpor = document.getElementById("buscarpor").value
            var tabla = document.getElementById("tbody")

            this.con.connect(function () {
                if (buscarpor == "rut") {

                    visita2.con.query("SELECT visita.rut,visita.nombre,visita.apellido,visita.telefono, visita.usuario, visita.fecha, vehiculovisita.patente, edificio.nombre as edificio, departamento.numero as departamento from visita left join vehiculovisita on visita.id=vehiculovisita.visita join edificio on edificio.id=visita.edificio join departamento on visita.departamento=departamento.id where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Visita no encontrada',

                            })
                            visita2.visitas = result

                        } else {
                            visita2.rrr=result[0].rut
                            console.log(visita2.rrr)
                            visita2.visitas = result
                            var fecha = new Date(result[0].fecha)
                            var f = result[0].fecha
                            fechaFinal = visita2.formatDate(f)
                            console.log(fechaFinal)
                            visita2.paginacion(1)
                            //visita2.rut=result.rut

                            //console.log(mysqlTimeStampToDate(result[0].fecha))

                        }
                    })
                } else {
                    visita2.con.query("SELECT visita.rut,visita.nombre,visita.apellido,visita.telefono, visita.usuario,visita.fecha, vehiculovisita.patente, edificio.nombre as edificio, departamento.numero as departamento from visita left join vehiculovisita on visita.id=vehiculovisita.visita join edificio on edificio.id=visita.edificio join departamento on visita.departamento=departamento.id where visita.fecha between ? and ?", [fecha1, fecha2], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Visita no encontrada',

                            })
                        } else {
                            visita2.visitas = result
                            visita2.f1=fecha1
                            visita2.f2=fecha2
                            visita2.paginacion2(1)

                        }
                    })
                }
            })
        },
        cambio: function () {
            visita2.visitas=[]
            visita2.visitasPaginacion=[]
            visita2.rrr=""
            visita2.paginacion()
            this.mostrarBoton=!this.mostrarBoton
            var busqueda = document.getElementById("buscarpor").value
            if (busqueda == "rut") {
                document.getElementById("1").style.display = "block"
                document.getElementById("2").style.display = "block"
                document.getElementById("3").style.display = "none"
                document.getElementById("4").style.display = "none"
                document.getElementById("5").style.display = "none"
            } else {
                document.getElementById("1").style.display = "none"
                document.getElementById("2").style.display = "none"
                document.getElementById("3").style.display = "block"
                document.getElementById("4").style.display = "block"
                document.getElementById("5").style.display = "block"
            }
        },

        formatDate: function (fecha) {
            var mes = fecha.getMonth() + 1
            var hora = fecha.getHours()
            var minutos = fecha.getMinutes()
            var segundos = fecha.getSeconds()
            return fecha.getDate() + "-" + mes + "-" + fecha.getFullYear() + " " + hora + ":" + minutos + ":" + segundos
        },
        paginacion: function (actual) {
            this.paginaA=actual
            this.con.connect(function () {
                visita2.con.query("SELECT count(*) as total FROM visita where rut=?", [visita2.rrr],function (error, result) {
                    var total = result[0].total
                    total2 = (total / 5).toFixed()
                    resto = ((total / 5).toFixed(2) - (total / 5).toFixed())
                    console.log(resto)
                    if (resto > 0 && resto < 5) {
                        visita2.totalPaginacion = parseInt(total2)+parseInt(1)
                    }else{
                        visita2.totalPaginacion = parseInt(total2)
                    }
                    //visita2.totalPaginacion = parseInt((total / 5).toFixed())
                    console.log(visita2.totalPaginacion)
                })
                visita2.con.query("SELECT visita.rut,visita.nombre,visita.apellido,visita.telefono, visita.usuario, visita.fecha, vehiculovisita.patente, edificio.nombre as edificio, departamento.numero as departamento from visita left join vehiculovisita on visita.id=vehiculovisita.visita join edificio on edificio.id=visita.edificio join departamento on visita.departamento=departamento.id where rut=? limit ?,?", [visita2.rrr,(actual - 1) * 5, 5], function (error, result) {

                    visita2.visitasPaginacion = result
                })

            })
        },
        paginacion2: function (actual) {
            this.paginaA=actual
            this.con.connect(function () {
                visita2.con.query("SELECT count(*) as total FROM visita where visita.fecha between ? and ?", [visita2.f1,visita2.f2],function (error, result) {
                    var total = result[0].total
                    total2 = (total / 5).toFixed()
                    resto = ((total / 5).toFixed(2) - (total / 5).toFixed())
                    
                    if (resto > 0 && resto < 5) {
                        visita2.totalPaginacion = parseInt(total2)+parseInt(1)
                    }else{
                        visita2.totalPaginacion = parseInt(total2)
                    }
                    //visita2.totalPaginacion = parseInt((total / 5).toFixed())
                })
                visita2.con.query("SELECT visita.rut,visita.nombre,visita.apellido,visita.telefono, visita.usuario, visita.fecha, vehiculovisita.patente, edificio.nombre as edificio, departamento.numero as departamento from visita left join vehiculovisita on visita.id=vehiculovisita.visita join edificio on edificio.id=visita.edificio join departamento on visita.departamento=departamento.id where visita.fecha between ? and ? limit ? , ?", [visita2.f1,visita2.f2,(actual - 1) * 5, 5], function (error, result) {
                    
                    visita2.visitasPaginacion = result
                    console.log(error)
                })

            })
        },
        
    },
    mounted: function () {
        this.paginacion()
        this.paginacion2()
    }


});