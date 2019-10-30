const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var dueño3 = new Vue({
    el: "#dueño3",
    data: {
        window: remote.getCurrentWindow(),
        dueños: [],
        depa: "",
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
                dueño3.con.query("select * from edificio", function (error, result) {
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
                dueño3.con.query("select * from departamento ", function (error, result) {
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
                dueño3.con.query("select departamento.dueño,dueño.* from departamento join dueño on departamento.dueño=dueño.rut where departamento.id=?", [departamento], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Dueño no encontrado',

                        })
                    } else {
                        result.forEach(function (element) {
                            dueño3.dueños = result
                            dueño3.depa=departamento
                            console.log(dueño3.depa)
                        })

                    }
                })
            })
        },
        eliminar: function (e) {
            this.con.connect(function () {
                depa=dueño3.depa
                try {
                    dueño3.con.query("update departamento set dueño ='Condominio' where id=?", [depa], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Dueño eliminado!',
                        })
                        dueño3.dueños=[]
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