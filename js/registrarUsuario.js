const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var usuario1 = new Vue({
    el: "#usuario1",
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
        registrarUsuario: function (ru) {
            ru.preventDefault()
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre").value
            apellido = document.getElementById("apellido").value
            telefono = document.getElementById("telefono").value
            correo = document.getElementById("correo").value
            clave = document.getElementById("clave").value
            clave2 = document.getElementById("clave2").value
            tipo = document.getElementById("tipo").value
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
                    text: 'Revise el RUT',
                })
            } else {
                this.con.connect(function () {
                    usuario1.con.query("select * from usuario where rut=?", [rut], function (error, result) {
                        if (result.length > 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Usuario ya registrado',
                            })
                        } else {
                            usuario1.con.query("insert into usuario (rut,nombre,apellido,telefono,correo,clave,tipo,estado) values(?,?,?,?,?,md5(?),?,1)", [rut, nombre, apellido, telefono, correo, clave, tipo], function (error, result) {

                                document.getElementById("rut").value = ""
                                document.getElementById("nombre").value = ""
                                document.getElementById("apellido").value = ""
                                document.getElementById("telefono").value = ""
                                document.getElementById("correo").value = ""
                                document.getElementById("clave").value = ""
                                document.getElementById("clave2").value = ""
                                Swal.fire({
                                    type: 'success',
                                    title: 'Listo!',
                                    text: 'Usuario registrado!',
                                })
                            })
                        }
                    })
                })
            }
        }
    }

});