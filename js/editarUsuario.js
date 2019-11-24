const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var usuario2 = new Vue({
    el: "#usuario2",
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
                    usuario2.con.query("select * from usuario where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Usuario no encontrado',
                            })
                            document.getElementById("nombre").value = ""
                            document.getElementById("apellido").value = ""
                            document.getElementById("telefono").value = ""
                            document.getElementById("correo").value = ""
                        } else {
                            result.forEach(function () {
                                document.getElementById("nombre").value = result[0].nombre
                                document.getElementById("apellido").value = result[0].apellido
                                document.getElementById("telefono").value = result[0].telefono
                                document.getElementById("correo").value = result[0].correo
                                document.getElementById("tipo").value = result[0].tipo
                            })

                        }
                    })
                })
            }
        },
        editarUsuario: function (ru) {
            ru.preventDefault()
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre").value
            apellido = document.getElementById("apellido").value
            telefono = document.getElementById("telefono").value
            correo = document.getElementById("correo").value
            tipo = document.getElementById("tipo").value
            clave = document.getElementById("clave").value
            clave2 = document.getElementById("clave2").value
            x = validaRut(rut)
            if (clave != clave2) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Las claves deben ser iguales',
                })
            } else if (x == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    usuario2.con.query("select * from usuario where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Usuario no encotrado',
                            })
                        } else {
                            usuario2.con.query("update usuario set nombre=?,apellido=?,telefono=?,correo=?,clave=md5(?),tipo=? where rut=?", [nombre, apellido, telefono, correo, clave, tipo, rut], function (error, result) {
                                document.getElementById("rut").value = ""
                                document.getElementById("nombre").value = ""
                                document.getElementById("apellido").value = ""
                                document.getElementById("telefono").value = ""
                                document.getElementById("correo").value = ""
                                document.getElementById("tipo").value = ""
                                document.getElementById("clave").value = ""
                                document.getElementById("clave2").value = ""
                                Swal.fire({
                                    type: 'success',
                                    title: 'Listo!',
                                    text: 'Usuario actualizado!',
                                })
                            })
                        }
                    })
                })
            }
        },
        onlyNumber: function (e) {
            if (!/\d/.test(e.key) && e.keyCode != 8 && e.keyCode != 13 && e.keyCode != 9) {
                e.preventDefault();
            }
        }
    }

});