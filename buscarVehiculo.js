const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var vehiculo1 = new Vue({
    el: "#vehiculo1",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        vehiculo: [],
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
            buscarpor = form.buscarpor.value
            buscar = form.buscar.value
            this.con.connect(function () {
                if (buscarpor == "patente") {
                    vehiculo1.con.query("select * from vehiculoresidente where patente=?", [buscar], function (error, result) {
                        if (result.length == 0) {
                            vehiculo1.con.query("select vehiculovisita.*, visita.rut from vehiculovisita JOIN visita on vehiculovisita.visita=visita.id where patente =?", [buscar], function (error, result) {
                                if (result.length == 0) {
                                    Swal.fire({
                                        type: 'error',
                                        title: 'Error...',
                                        text: 'Vehiculo no encontrado',

                                    })
                                } else {
                                    vehiculo1.vehiculo = result
                                }
                            })

                            console.log(buscarpor)
                        } else {
                            vehiculo1.vehiculo = result
                        }
                    })
                } else {
                    vehiculo1.con.query("select * from vehiculoresidente where residente=?", [buscar], function (error, result) {
                        if (result.length == 0) {
                            vehiculo1.con.query("select vehiculovisita.*,visita.rut from vehiculovisita join visita on visita.id=vehiculovisita.visita where visita.rut=?", [buscar], function (error, result) {
                                if (result.length == 0) {
                                    Swal.fire({
                                        type: 'error',
                                        title: 'Error...',
                                        text: 'Vehiculo no encontrado',

                                    })
                                } else {
                                    vehiculo1.vehiculo = result
                                }
                            })

                            console.log(buscarpor)
                        } else {
                            vehiculo1.vehiculo = result
                        }
                    })
                }


            })
        }
    }

});
