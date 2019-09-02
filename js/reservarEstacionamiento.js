const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var estacionamiento2 = new Vue({
    el: "#estacionamiento2",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        est: "",
        tip: "",
        re: [],
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
                estacionamiento2.con.query("SELECT residente.rut, residente.nombre, residente.apellido, residente.telefono, estacionamientoresidente.numero, estacionamientoresidente.residente as asignado, edificio.nombre as edificio,departamento.numero as departamento from residente left join estacionamientoresidente on residente.departamento=estacionamientoresidente.departamento left join edificio on residente.edificio=edificio.id left join departamento on residente.departamento=departamento.id where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Residente no encontrado',

                        })
                    } else {
                        estacionamiento2.re = result
                        var estacionamientosSelect = document.getElementById("reservarE")
                        estacionamiento2.con.query("SELECT residente.rut, estacionamientoresidente.numero, estacionamientoresidente.residente as asignado, edificio.nombre as edificio,departamento.numero as departamento from residente left join estacionamientoresidente on residente.departamento=estacionamientoresidente.departamento left join edificio on residente.edificio=edificio.id left join departamento on residente.departamento=departamento.id where rut=?", [rut], function (error, result) {
                            result.forEach(function (dato) {
                                if (dato.asignado == null) {
                                    var option = document.createElement("option")
                                    option.value = dato.numero
                                    option.innerHTML = dato.numero
                                    console.log(dato.numero)
                                    estacionamientosSelect.appendChild(option)
                                }

                            })
                        })

                    }
                })
            })
        },
        
    }

});
