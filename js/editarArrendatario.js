const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var arrendatario2 = new Vue({
    el: "#arrendatario2",
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
                document.getElementById("nombre").value = ""
                document.getElementById("apellido").value = ""
                document.getElementById("telefono").value = ""
            } else {
                this.con.connect(function () {
                    arrendatario2.con.query("select * from arrendatario where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Arrendatario no encontrado',
                            })
                            document.getElementById("rut").value = ""
                            document.getElementById("nombre").value = ""
                            document.getElementById("apellido").value = ""
                            document.getElementById("telefono").value = ""
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
        editarArrendatario: function (er) {
            er.preventDefault()
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre").value
            apellido = document.getElementById("apellido").value
            telefono = document.getElementById("telefono").value
            this.con.connect(function () {
                arrendatario2.con.query("select * from arrendatario where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Arrendatario no encontrado',
                        })
                    } else {
                        arrendatario2.con.query("update arrendatario set nombre=?,apellido=?,telefono=? where rut=?", [nombre, apellido, telefono, rut], function (error, result) {
                            document.getElementById("rut").value = ""
                            document.getElementById("nombre").value = ""
                            document.getElementById("apellido").value = ""
                            document.getElementById("telefono").value = ""
                            Swal.fire({
                                type: 'success',
                                title: 'Listo!',
                                text: 'Arrendatario actualizado!',

                            })
                        })
                    }
                })
            })
        }
    },
});