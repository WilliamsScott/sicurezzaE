const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var vehiculo2 = new Vue({
    el: "#vehiculo2",
    data: {
        window: remote.getCurrentWindow(),
        residentes: [],
        con: remote.getGlobal("con")
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre")
            var estacionamiento = document.getElementById("estacionamiento")
            rut2 = validaRut(rut)
            if (rut2 == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    vehiculo2.con.query("SELECT residente.rut, residente.nombre,residente.apellido,residente.telefono,edificio.nombre as edificio,departamento.numero as departamento from residente join edificio on residente.edificio=edificio.id join departamento on residente.departamento=departamento.id where rut=?", [rut2], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Residente no encontrado',
                            })
                            vehiculo2.residentes = []
                            nombre.value = ""
                            estacionamiento.innerHTML = ""
                            //var departameno = result[0].departameno
                        } else {
                            vehiculo2.residentes = result
                            vehiculo2.rutR = result[0].rut
                            nombre.value = result[0].nombre + " " + result[0].apellido
                            vehiculo2.con.query("select * from estacionamientoresidente where residente=?", [rut2], function (error, result) {
                                var largo1 = result.length
                                var est = result
                                if (result.length == 0) {
                                    Swal.fire({
                                        type: 'error',
                                        title: 'Error...',
                                        text: 'Residente sin estacionamientos',
                                    })
                                    estacionamiento.innerHTML = ""

                                } else {
                                    vehiculo2.con.query("select * from vehiculoresidente where residente=?", [rut2], function (error, result) {
                                        if (largo1 == result.length) {
                                            Swal.fire({
                                                type: 'error',
                                                title: 'Error...',
                                                text: 'Residente sin estacionamientos',
                                            })
                                            estacionamiento.innerHTML = ""

                                        } else {
                                            vehiculo2.con.query("SELECT estacionamientoresidente.*,vehiculoresidente.patente from estacionamientoresidente left join vehiculoresidente on estacionamientoresidente.numero=vehiculoresidente.numeroEstacionamiento where estacionamientoresidente.residente=?", [rut2], function (error, result) {
                                                estacionamiento.innerHTML = ""
                                                result.forEach(function (e) {
                                                    if (e.patente == null) {
                                                        var option = document.createElement("option")
                                                        option.value = e.numero
                                                        option.innerHTML = e.numero
                                                        estacionamiento.appendChild(option)
                                                    }

                                                })
                                            })


                                        }
                                    })
                                }
                            })
                        }
                    })
                })
            }
        },
        agregarVehiculo: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            patente = document.getElementById("patente").value
            marca = document.getElementById("marca").value
            modelo = document.getElementById("modelo").value
            estacionamiento = document.getElementById("estacionamiento").value
            rut2 = validaRut(rut)
            if (estacionamiento == "") {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Debe seleccionar un estacionamiento',
                })
            } else if (rut2 == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            }
            else {
                var expReg = /^([A-Za-z]{2,4}\d{2,4})$/
                if (expReg.test(patente)) {
                    this.con.connect(function () {
                        vehiculo2.con.query("select * from vehiculoresidente where patente=?", [patente], function (error, result) {
                            if (result.length != 0) {
                                Swal.fire(
                                    'Error!',
                                    'La patente ya se encuentra registrada',
                                    'error'
                                )
                            } else {

                                vehiculo2.con.query("insert into vehiculoresidente (patente,marca,modelo,numeroEstacionamiento,residente) values(?,?,?,?,?)", [patente, marca, modelo, estacionamiento, rut2], function (error, result) {
                                    document.getElementById("rut").value = ""
                                    document.getElementById("patente").value = ""
                                    document.getElementById("marca").value = ""
                                    document.getElementById("modelo").value = ""
                                    document.getElementById("estacionamiento").innerHTML = ""
                                    Swal.fire(
                                        'Listo!',
                                        'Vehiculo Registrado Con Éxito!',
                                        'success'
                                    )
                                })

                            }
                        })

                    })
                } else {
                    Swal.fire(
                        'Error!',
                        'Revise patente',
                        'error'
                    )
                }
            }
        }

    }

});
