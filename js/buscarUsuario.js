const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var usuario3 = new Vue({
    el: "#usuario3",
    data: {
        window: remote.getCurrentWindow(),
        usuarios: [],
        rutU: "",
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
                usuario3.usuarios = []
                usuario3.rutU =""
            } else {
                this.con.connect(function () {
                    usuario3.con.query("select usuario.rut,usuario.nombre,usuario.apellido, usuario.telefono, usuario.correo,usuario.tipo,usuario.estado from usuario where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Usuario no encontrado',
                            })
                            usuario3.usuarios = []
                            usuario3.rutU =""
                        } else {
                            usuario3.usuarios = result
                            usuario3.rutU = result[0].rut
                        }
                    })
                })
            }
        },
        deshabilitar: function (e) {
            e.preventDefault()
            this.con.connect(function () {
                try {
                    usuario3.con.query("UPDATE usuario set estado = 0 where rut=?", [usuario3.rutU], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Usuario deshabilitado!',
                        })
                        usuario3.usuarios = []
                    })
                } catch (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'Usuario no deshabilitado',

                    })
                }

            })
        },
        habilitar: function (e) {
            e.preventDefault()
            this.con.connect(function () {
                try {
                    usuario3.con.query("UPDATE usuario set estado = 1 where rut=?", [usuario3.rutU], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Usuario habilitado!',
                        })
                        usuario3.usuarios = []
                    })
                } catch (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'Usuario no habilitado',

                    })
                }

            })
        }
    }

});
