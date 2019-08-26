const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var residente3 = new Vue({
    el: "#residente3",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        est: "",
        tip: "",
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
            form = e.target.parentNode.parentNode.parentNode
            rut = form.rut.value
            this.con.connect(function () {
                residente3.con.query("SELECT residente.rut, residente.nombre,residente.apellido,residente.telefono,edificio.nombre as edificio,departamento.numero as departamento from residente join edificio on residente.edificio=edificio.id join departamento on residente.departamento=departamento.id where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        alert("error, residente no encontrado")
                    } else {
                        result.forEach(function (element) {
                            residente3.x = result[0]

                        })

                    }
                })
            })
        }
    }

});
