const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var vehiculo1 = new Vue({
    el: "#vehiculo1",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        vehiculo: [],
        con: remote.getGlobal("con")
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            buscarpor = document.getElementById("buscarpor").value
            buscar = document.getElementById("buscar").value
            this.con.connect(function () {
                if (buscarpor == "patente") {
                    var expReg = /^([A-Za-z]{2,4}\d{2,4})$/
                    if (expReg.test(buscar)) {
                        vehiculo1.con.query("select * from vehiculoresidente where patente=?", [buscar], function (error, result) {
                            if (result.length == 0) {
                                vehiculo1.con.query("select vehiculovisita.*, visita.rut from vehiculovisita JOIN visita on vehiculovisita.visita=visita.id where patente =?", [buscar], function (error, result) {
                                    if (result.length == 0) {
                                        Swal.fire({
                                            type: 'error',
                                            title: 'Error...',
                                            text: 'Vehiculo no encontrado',
                                        })
                                        vehiculo1.vehiculo = []
                                    } else {
                                        vehiculo1.vehiculo = result
                                    }
                                })
                                console.log(buscarpor)
                            } else {
                                vehiculo1.vehiculo = result
                            }
                        })
                    }else{
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Revise patente',
                        }) 
                        vehiculo1.vehiculo = []
                    }

                } else {
                    if (validaRut(buscar) == false) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Revise RUT',
                        })
                        vehiculo1.vehiculo = []
                    } else {
                        var rut2=validaRut(buscar)
                        vehiculo1.con.query("select * from vehiculoresidente where residente=?", [rut2], function (error, result) {
                            if (result.length == 0) {
                                vehiculo1.vehiculo = []
                                vehiculo1.con.query("select vehiculovisita.*,visita.rut from vehiculovisita join visita on visita.id=vehiculovisita.visita where visita.rut=?", [buscar], function (error, result) {
                                    if (result.length == 0) {
                                        Swal.fire({
                                            type: 'error',
                                            title: 'Error...',
                                            text: 'Vehiculo no encontrado',
                                        })
                                        vehiculo1.vehiculo = []
                                    } else {
                                        vehiculo1.vehiculo = result
                                    }
                                })
                            } else {
                                vehiculo1.vehiculo = result
                            }
                        })

                    }
                }


            })
        }
    }

});
