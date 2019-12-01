const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var dueño6 = new Vue({
    el: "#dueño6",
    data: {
        window: remote.getCurrentWindow(),
        dueño: [],
        departamentos: "",
        rutD: "",
        con: remote.getGlobal("con")
    },
    mounted: function () {

    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            rut2 = validaRut(rut)
            if (rut2 == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    dueño6.con.query("select dueño.*, count(*) as total from departamento join dueño on departamento.dueño=dueño.rut where rut=?", [rut2], function (error, result) {
                        if (result.length == 0 || result[0].rut == null) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Dueño no encontrado',

                            })
                            dueño6.dueño = []
                        } else {
                            dueño6.dueño = result
                            dueño6.rutD = result[0].rut
                        }
                    })
                })
            }
        },
        eliminar: function (e) {
            e.preventDefault()
            this.con.connect(function () {
                dueño6.con.query("update departamento set dueño = 'Condominio' where dueño=?", [dueño6.rutD], function (error, result) {
                    dueño6.con.query("DELETE from dueño where rut=?", [dueño6.rutD], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Dueño eliminado!',
                        })
                        dueño6.dueño = []
                        dueño6.rutD.value=""
                        document.getElementById("rut").value = ""

                    })
                })
            })


        }
    }

});
