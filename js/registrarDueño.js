const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var dueño1 = new Vue({
    el: "#dueño1",
    data: {
        window: remote.getCurrentWindow(),
        con: remote.getGlobal("con")
    },
    methods: {
        registrarDueño: function (rd) {
            rd.preventDefault()
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
                    dueño1.con.query("select * from dueño where rut=?", [rut], function (error, result) {
                        if (result.length > 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Dueño ya registrado',
                            })
                        }
                        else {
                            dueño1.con.query("insert into dueño (rut,nombre,apellido,telefono) values (?,?,?,?)  ", [rut, nombre, apellido, telefono], function (error, result) {
                                document.getElementById("rut").value = ""
                                document.getElementById("nombre").value = ""
                                document.getElementById("apellido").value = ""
                                document.getElementById("telefono").value = ""
                                Swal.fire({
                                    type: 'success',
                                    title: 'Listo!',
                                    text: 'Dueño registrado!',
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
})