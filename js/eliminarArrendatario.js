const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var arrendatario6 = new Vue({
    el: "#arrendatario6",
    data: {
        window: remote.getCurrentWindow(),
        arrendatario: [],
        departamentos: "",
        rutA: "",
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    mounted: function () {

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
                    arrendatario6.con.query("select arrendatario.*, count(*) as total from departamento join arrendatario on departamento.arrendatario=arrendatario.rut where rut=?", [rut], function (error, result) {
                        if (result.length == 0 || result[0].rut == null) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Arrendatario no encontrado',

                            })
                            arrendatario6.arrendatario = []
                        } else {
                            arrendatario6.arrendatario = result
                            arrendatario6.rutA = result[0].rut
                        }
                    })
                })
            }
        },
        eliminar: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut")
            this.con.connect(function () {

                arrendatario6.con.query("update departamento set arrendatario = null where arrendatario=?", [arrendatario6.rutA], function (error, result) {
                    arrendatario6.con.query("DELETE from arrendatario where rut=?", [arrendatario6.rutA], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Arrendatario eliminado!',
                        })
                        arrendatario6.arrendatario = []
                        rut.value = ""
                    })
                })



            })

        }
    }

});
