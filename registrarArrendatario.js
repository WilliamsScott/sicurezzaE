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
            form = ra.target
            rut = form.rut.value
            nombre = form.nombre.value
            apellido = form.apellido.value
            telefono = form.telefono.value
            if (rut == "" || nombre == "" || apellido == "" || telefono == "") {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Complete todos los campos',
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
                            console.log(result)
                        }
                        else {
                            arrendatario1.con.query("insert into arrendatario (rut,nombre,apellido,telefono) values (?,?,?,?)  ", [rut, nombre, apellido, telefono], function (error, result) {
                                form.rut.value = ""
                                form.nombre.value = ""
                                form.apellido.value = ""
                                form.telefono.value = ""
                                Swal.fire({
                                    type: 'success',
                                    title: 'Listo!',
                                    text: 'Arrendatario asignado!',
                                })
                            })
                        }
                    })
                })


            }


        }
    }
})