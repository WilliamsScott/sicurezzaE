const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var vehiculo2 = new Vue({
    el: "#vehiculo2",
    data: {
        window: remote.getCurrentWindow(),
        residentes: [],
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
            var estacionamiento = document.getElementById("estacionamiento")
            this.con.connect(function () {
                vehiculo2.con.query("SELECT residente.rut, residente.nombre,residente.apellido,residente.telefono,edificio.nombre as edificio,departamento.numero as departamento from residente join edificio on residente.edificio=edificio.id join departamento on residente.departamento=departamento.id where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Residente no encontrado',
                        })
                        vehiculo2.residentes = []
                        form.nombre.value = ""
                        var departameno = result[0].departameno
                    } else {
                        vehiculo2.residentes = result
                        vehiculo2.rutR = result[0].rut
                        form.nombre.value = result[0].nombre + " " + result[0].apellido
                        vehiculo2.con.query("select * from estacionamientoresidente where residente=?", [rut], function (error, result) {
                            var largo1 = result.length
                            var est = result
                            if (result.length == 0) {
                                Swal.fire({
                                    type: 'error',
                                    title: 'Error...',
                                    text: 'Residente sin estacionamientos',
                                })

                            } else {
                                vehiculo2.con.query("select * from vehiculoresidente where residente=?", [rut], function (error, result) {
                                    if (largo1 == result.length) {
                                        Swal.fire({
                                            type: 'error',
                                            title: 'Error...',
                                            text: 'Residente sin estacionamientos',
                                        })

                                    } else {
                                        console.log(largo1, result.length)
                                        est.forEach(function (dato) {///BORRAR IF
                                            var option = document.createElement("option")
                                            option.value = dato.numero
                                            option.innerHTML = dato.numero
                                            estacionamiento.appendChild(option)
                                            console.log(dato)

                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            })
        },

    }

});
