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
            form = e.target.parentNode.parentNode.parentNode
            rut = form.rut.value
            this.con.connect(function () {
                usuario2.con.query("select * from usuario where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Usuario no encontrado',

                        })
                    } else {
                        result.forEach(function (element) {
                            // console.log(result[0].nombre)
                            form.nombre.value = result[0].nombre
                            form.apellido.value = result[0].apellido
                            form.telefono.value = result[0].telefono
                            form.correo.value = result[0].correo
                            form.tipo.value = result[0].tipo
                            form.estado.value = result[0].estado
                        })

                    }
                })
            })
        },
        editarUsuario: function (ru) {
            ru.preventDefault()
            form = ru.target
            rut = form.rut.value
            nombre = form.nombre.value
            apellido = form.apellido.value
            telefono = form.telefono.value
            correo = form.correo.value
            clave = form.clave.value
            clave2 = form.clave2.value
            tipo = form.tipo.value
            estado = form.estado.value
            if (clave != clave2) {
                alert("error revise las claves")

            } else {
                this.con.connect(function () {
                    usuario2.con.query("select * from usuario where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            alert("error, usuario no encontrado")
                            console.log(result)
                        } else {
                            usuario2.con.query("update usuario set nombre=?,apellido=?,telefono=?,correo=?,clave=md5(?),tipo=?,estado=? where rut=?", [nombre, apellido, telefono, correo, clave, tipo, estado, rut], function (error, result) {
                                form.rut.value = ""
                                form.nombre.value = ""
                                form.apellido.value = ""
                                form.telefono.value = ""
                                form.correo.value = ""
                                form.clave.value = ""
                                form.clave2.value = ""
                                alert("registrado")
                            })
                        }
                    })
                })
            }
        }
    }

});