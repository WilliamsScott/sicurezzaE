const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var residente4 = new Vue({
    el: "#residente4",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        est: "",
        tip: "",
        encontrado: "",
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
                residente4.con.query("SELECT residente.rut, residente.nombre,residente.apellido,residente.telefono,edificio.nombre as edificio,departamento.numero as departamento from residente join edificio on residente.edificio=edificio.id join departamento on residente.departamento=departamento.id where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        alert("error, residente no encontrado")
                    } else {
                        result.forEach(function (element) {
                            residente4.x = result[0]
                            this.encontrado = element.rut
                            console.log(encontrado)
                        })

                    }
                })
            })
        },
        eliminarResidente: function (e) {
            e.preventDefault()
            this.con.connect(function () {
                residente4.con.query("SELECT residente.rut, residente.nombre,residente.apellido,residente.telefono,edificio.nombre as edificio,departamento.numero as departamento from residente join edificio on residente.edificio=edificio.id join departamento on residente.departamento=departamento.id where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        alert("error, residente no encontrado")
                    } else {
                        result.forEach(function (element) {
                            residente4.x = result[0]
                            this.encontrado = element.rut
                            residente4.con.query("DELETE from vehiculoresidente where residente=?", [encontrado], function (error, result) {
                                residente4.con.query("update estacionamientoresidente set residente=null where residente=?", [encontrado], function (error, result) {
                                    residente4.con.query("DELETE from residente where rut=?", [encontrado], function (error, result) {
                                        alert("residente eliminado")
                                        residente4.x = []
                                        form.rut.value = ""
                                    })
                                })
                            })
                        })

                    }
                })
            })
        }


    }

});
