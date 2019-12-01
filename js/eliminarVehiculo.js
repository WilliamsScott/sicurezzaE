const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var vehiculo3 = new Vue({
    el: "#vehiculo3",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        vehiculo: [],
        con: remote.getGlobal("con")
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            rut2 = validaRut(rut)
            if (rut2 == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
                vehiculo3.vehiculo = []
            } else {
                this.con.connect(function () {
                    vehiculo3.con.query("select * from vehiculoresidente where residente=?", [rut2], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: "Ningun vehiculo encontrado para ese RUT",
                            })
                        } else {
                            vehiculo3.vehiculo = result
                        }
                    })
                })
            }
        },
        eliminarVehiculo: function (patente) {
            this.con.connect(function () {
                try {
                    vehiculo3.con.query("delete from vehiculoresidente where patente=?", [patente], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Vehiculo Eliminado',
                        })
                    })
                    vehiculo3.vehiculo = []
                    document.getElementById("rut").value = ""

                } catch{
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'No se pudo eliminar',

                    })
                }

            })
        }
    }

});
