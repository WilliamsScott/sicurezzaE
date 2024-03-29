const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var incidente1 = new Vue({
    el: "#incidente1",
    data: {
        window: remote.getCurrentWindow(),
        con: remote.getGlobal("con"),
        selected:1
    },
    methods: {
        registrarIncidente: function (ri) {
            ri.preventDefault()
            tipo = document.getElementById("tipo").value
            descripcion = document.getElementById("descripcion").value
            estado=document.getElementById("estado").value
            let user = localStorage.user
            this.con.connect(function () {
                console.log(estado)
                try {
                    incidente1.con.query("insert into incidente (tipo,descripcion,usuario,fecha,estado,fecha2) VALUES(?,?,?,current_timestamp,?,current_timestamp) ", [tipo, descripcion, user,incidente1.selected], function (error, result) {
                        document.getElementById("tipo").value = 1
                        document.getElementById("descripcion").value = ""
                        Swal.fire(
                            'Listo!',
                            'Incidente Registrado Con Éxito!',
                            'success'
                        )
                    })
                } catch{
                    Swal.fire(
                        'Error!',
                        'Incidente No se pudo registrar '+error,
                        'error'
                    )
                }
            })





        }
    }
})