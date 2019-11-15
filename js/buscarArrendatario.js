const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var arrendatario3 = new Vue({
    el: "#arrendatario3",
    data: {
        window: remote.getCurrentWindow(),
        arrendatarios: [],
        depa: "",
        selected:"",
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
                arrendatario3.con.query("select * from edificio", function (error, result) {
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
            var edificio = document.getElementById("edificio")
            var e = edificio.value
            this.con.connect(function () {
                arrendatario3.con.query("select * from departamento where edificio=1", function (error, result) {
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
                arrendatario3.con.query("select departamento.arrendatario,arrendatario.* from departamento join arrendatario on departamento.arrendatario=arrendatario.rut where departamento.id=?", [departamento], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Departamento no posee arrendatario',
                        })
                        arrendatario3.arrendatarios=[]
                    } else {
                        result.forEach(function (element) {
                            arrendatario3.arrendatarios = result
                            arrendatario3.depa=departamento
                        })

                    }
                })
            })
        },
        eliminar: function (e) {
            this.con.connect(function () {
                depa=arrendatario3.depa
                try {
                    arrendatario3.con.query("update departamento set arrendatario =null where id=?", [depa], function (error, result) {
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Arrendatario quitado!',
                        })
                        arrendatario3.arrendatarios=[]
                    })
                } catch{
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'No se pudo quitar arrendatario',

                    })
                }

            })
        },
        cambio: function () {
            var departamento = document.getElementById("departamento")
            departamento.innerHTML = ""
            this.con.connect(function () {
                arrendatario3.con.query("select * from departamento where edificio=?", [arrendatario3.selected], function (error, result) {
                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        option.value = dato.id
                        option.innerHTML = dato.numero
                        departamento.appendChild(option)
                    })
                })
            })
        },

    },
    mounted: function () {
        this.cargarSelect()
        this.cargarSelect2()
    }

});