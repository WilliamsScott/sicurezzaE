const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var incidente1 = new Vue({
    el: "#incidente1",
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
        registrarIncidente: function (ri) {
            ri.preventDefault()
            form = ri.target
            tipo = form.tipo.value
            descripcion = form.descripcion.value
            let user = localStorage.user
            console.log(user,tipo)
            this.con.connect(function () {
                try {
                    incidente1.con.query("insert into incidente (tipo,descripcion,usuario) VALUES(?,?,?) ", [tipo, descripcion, user], function (error, result) {
                        form.tipo.value =1
                        form.descripcion.value = ""
                        Swal.fire(
                            'Listo!',
                            'Incidente Registrado Con Éxito!',
                            'success'
                        )
                    })
                } catch{
                    Swal.fire(
                        'Error!',
                        'Incidente No se pudo registrar',
                        'error'
                    )
                }
            })





        }
    }
})