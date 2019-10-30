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
            form = e.target.parentNode.parentNode.parentNode
            rut = form.rut.value
            this.con.connect(function () {
                arrendatario2.con.query("select * from arrendatario where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Arrendatario no encontrado',

                        })
                    } else {
                        result.forEach(function (element) {
                            form.nombre.value = result[0].nombre
                            form.apellido.value = result[0].apellido
                            form.telefono.value = result[0].telefono
                        })

                    }
                })
            })
        },
        editarArrendatario: function (er) {
            er.preventDefault()
            form = er.target
            rut = form.rut.value
            nombre = form.nombre.value
            apellido = form.apellido.value
            telefono = form.telefono.value

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
                            form.rut.value = ""
                            form.nombre.value = ""
                            form.apellido.value = ""
                            form.telefono.value = ""
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
    mounted: function () {
    }

});