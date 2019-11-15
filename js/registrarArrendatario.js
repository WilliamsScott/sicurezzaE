const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var arrendatario1 = new Vue({
    el: "#arrendatario1",
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
        registrarArrendatario: function (ra) {
            ra.preventDefault()
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre").value
            apellido = document.getElementById("apellido").value
            telefono = document.getElementById("telefono").value
            x = validaRut(rut)
            if (x == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    arrendatario1.con.query("select * from arrendatario where rut=?", [rut], function (error, result) {
                        if (result.length > 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Arrendatario ya registrado',
                            })
                        }
                        else {
                            arrendatario1.con.query("insert into arrendatario (rut,nombre,apellido,telefono) values (?,?,?,?)  ", [rut, nombre, apellido, telefono], function (error, result) {
                                document.getElementById("rut").value = ""
                                document.getElementById("nombre").value = ""
                                document.getElementById("apellido").value = ""
                                document.getElementById("telefono").value = ""
                                Swal.fire({
                                    type: 'success',
                                    title: 'Listo!',
                                    text: 'Arrendatario registrado!',
                                })
                            })
                        }
                    })
                })


            }


        }
    }
})