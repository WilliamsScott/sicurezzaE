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
                    usuario1.con.query("select * from usuario where rut=?", [rut], function (error, result) {
                        if (result.length > 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Usuario ya registrado',

                            })
                            console.log(result)
                        } else {
                            usuario1.con.query("insert into usuario (rut,nombre,apellido,telefono,correo,clave,tipo,estado) values(?,?,?,?,?,md5(?),?,?)", [rut, nombre, apellido, telefono, correo, clave, tipo, estado], function (error, result) {
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