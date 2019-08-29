const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var dueño1 = new Vue({
    el: "#dueño1",
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
        registrarDueño: function (rd) {
            rd.preventDefault()
            form = rd.target
            rut = form.rut.value
            nombre = form.nombre.value
            apellido = form.apellido.value
            telefono = form.telefono.value
            if (rut == "" || nombre == "" || apellido == "" || telefono == "") {
                alert("error")

            } else {
                this.con.connect(function () {
                    dueño1.con.query("select * from dueño where rut=?", [rut], function (error, result) {
                        if (result.length > 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Dueño ya registrado',

                            })
                            console.log(result)
                        }
                        else {
                            dueño1.con.query("insert into dueño (rut,nombre,apellido,telefono) values (?,?,?,?)  ", [rut, nombre, apellido, telefono], function (error, result) {
                                form.rut.value = ""
                                form.nombre.value = ""
                                form.apellido.value = ""
                                form.telefono.value = ""
                                alert("registrado")
                            })
                        }
                    })
                })


            }


        }
    }
})