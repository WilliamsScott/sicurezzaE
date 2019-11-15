const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var dueño2 = new Vue({
    el: "#dueño2",
    data: {
        window: remote.getCurrentWindow(),
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            x = validaRut(rut)
            if (x == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    dueño2.con.query("select * from dueño where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Dueño no encontrado',

                            })
                        } else {
                            result.forEach(function (element) {
                                document.getElementById("nombre").value = result[0].nombre
                                document.getElementById("apellido").value = result[0].apellido
                                document.getElementById("telefono").value = result[0].telefono
                            })

                        }
                    })
                })
            }
        },
        editarDueño: function (er) {
            er.preventDefault()
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre").value
            apellido = document.getElementById("apellido").value
            telefono = document.getElementById("telefono").value

            this.con.connect(function () {
                dueño2.con.query("select * from dueño where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Dueño no encontrado',
                        })
                    } else {
                        dueño2.con.query("update dueño set nombre=?,apellido=?,telefono=? where rut=?", [nombre, apellido, telefono, rut], function (error, result) {
                            document.getElementById("rut").value = ""
                            document.getElementById("nombre").value = ""
                            document.getElementById("apellido").value = ""
                            document.getElementById("telefono").value = ""
                            Swal.fire({
                                type: 'success',
                                title: 'Listo!',
                                text: 'Dueño actualizado!',

                            })
                        })
                    }
                })
            })

        }
    },

});