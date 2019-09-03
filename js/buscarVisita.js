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
        visitas: [],
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    mounted: function () {

    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            rut = form.rut.value
            fecha1 = form.fecha1.value
            fecha2 = form.fecha2.value
            buscarpor = form.buscarpor.value
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
                            let user = localStorage.user
                            console.log(user)

                        } else {
                            visita2.visitas = result
                            var fecha = new Date(result[0].fecha)
                            var f = result[0].fecha
                            fechaFinal = visita2.formatDate(f)
                            console.log(fechaFinal)
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
                            let user = localStorage.user
                            console.log(user)
                        } else {
                            visita2.visitas = result

                        }
                    })
                }
            })
        },
        formatDate: function (fecha) {
            var mes = fecha.getMonth() + 1
            var hora = fecha.getHours()
            var minutos = fecha.getMinutes()
            var segundos = fecha.getSeconds()
            return fecha.getDate() + "-" + mes + "-" + fecha.getFullYear() + " " + hora + ":" + minutos + ":" + segundos
        },
        paginacion:function(){
            this.con.connect(function(){
                visita2.con.query("SELECT count(*) FROM visita",function(error,result){
                    var total=result
                    visita2.con.query("SELECT * FROM visita limit 0,3")
                })

            })
        }
    }


});