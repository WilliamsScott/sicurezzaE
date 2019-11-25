const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var estacionamiento2 = new Vue({
    el: "#estacionamiento2",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        est: "",
        tip: "",
        re: [],
        con: remote.getGlobal("con")
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            x = validaRut(rut)
            if (x == false) {
                Swal.fire(
                    'Error!',
                    'Revise Rut',
                    'error'
                )
            } else {
                this.con.connect(function () {
                    estacionamiento2.con.query("SELECT residente.rut, residente.nombre, residente.apellido, residente.telefono, estacionamientoresidente.numero, estacionamientoresidente.residente as asignado, edificio.nombre as edificio,departamento.numero as departamento from residente left join estacionamientoresidente on residente.departamento=estacionamientoresidente.departamento left join edificio on residente.edificio=edificio.id left join departamento on residente.departamento=departamento.id where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Residente no encontrado',

                            })
                        } else {
                            estacionamiento2.re = result
                        }
                    })
                })
            }
        },
        reservarE: function (numero, rut) {
            this.con.connect(function () {
                try {
                    estacionamiento2.con.query("update estacionamientoresidente set residente=? where numero=?", [rut, numero], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Estacionamiento reservado!',
                        })
                        estacionamiento2.re = []
                    })
                } catch (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'No se pudo reservar',

                    })
                }
            })
        },
        quitarE: function (numero, rut) {
            this.con.connect(function () {
                estacionamiento2.con.query("select * from vehiculoresidente where numeroEstacionamiento=?", [numero], function (error, result) {
                    if (result.length != 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Hay un vehiculo asignado a este estacionamiento',
                        })
                    } else {
                        try {
                            estacionamiento2.con.query("update estacionamientoresidente set residente= null where numero=?", [numero], function (error, result) {
                                Swal.fire({
                                    type: 'success',
                                    title: 'Listo!',
                                    text: 'Estacionamiento quitado!',

                                })
                                estacionamiento2.re = []
                            })
                        } catch (error) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'No se pudo quitar',

                            })
                        }
                    }
                })

            })
        }

    }

});
