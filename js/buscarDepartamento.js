const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var departamento1 = new Vue({
    el: "#departamento1",
    data: {
        window: remote.getCurrentWindow(),
        depa: [],
        residentes: [],
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    methods: {
        cargarSelect: function () {
            var edificio = document.getElementById("edificio")
            this.con.connect(function () {
                departamento1.con.query("select * from edificio", function (error, result) {
                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        option.value = dato.id
                        option.innerHTML = dato.nombre
                        edificio.appendChild(option)
                    })
                })
            })
        },
        cargarSelect2: function () {
            var departamento = document.getElementById("departamento")
            this.con.connect(function () {
                departamento1.con.query("select * from departamento ", function (error, result) {
                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        option.value = dato.id
                        option.innerHTML = dato.numero
                        departamento.appendChild(option)
                    })
                })
            })
        },
        buscar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            edificio = form.edificio.value
            departamento = form.departamento.value
            this.con.connect(function () {
                departamento1.con.query("select departamento.numero, departamento.dueño, departamento.arrendatario, edificio.nombre as edificio from departamento join edificio on departamento.edificio=edificio.id where departamento.id=?", [departamento], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Dueño no encontrado',
                        })
                    } else {
                        result.forEach(function () {
                            departamento1.depa = result
                        })
                        departamento1.con.query("select count(*) as total from residente where residente.departamento=?", [departamento], function (error, result) {
                            result.forEach(function () {
                                departamento1.residentes = result
                            })
                        })

                    }
                })
            })
        },
        eliminar: function (e) {
            this.con.connect(function () {
                depa = dueño3.depa
                try {
                    dueño3.con.query("update departamento set dueño ='Condominio' where id=?", [depa], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Dueño eliminado!',
                        })
                        dueño3.dueños = []
                    })
                } catch{
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'No se pudo eliminar dueño',

                    })
                }

            })
        }

    },
    mounted: function () {
        this.cargarSelect()
        this.cargarSelect2()
    }

});