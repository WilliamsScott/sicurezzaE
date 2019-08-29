const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var residente2 = new Vue({
    el: "#residente2",
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
        cargarSelect: function () {
            var edificio = document.getElementById("edificio")
            this.con.connect(function () {
                residente2.con.query("select * from edificio", function (error, result) {
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
                residente2.con.query("select * from departamento ", function (error, result) {
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
            rut = form.rut.value
            this.con.connect(function () {
                residente2.con.query("select * from residente where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Residente no encontrado',

                        })
                        console.log(result)
                    } else {
                        result.forEach(function (element) {
                            console.log(result[0].nombre)
                            form.nombre.value = result[0].nombre
                            form.apellido.value = result[0].apellido
                            form.telefono.value = result[0].telefono
                            form.edificio.value = result[0].edificio
                            form.departamento.value = result[0].departamento
                        })

                    }
                })
            })
        },
        editarResidente: function (er) {
            er.preventDefault()
            form = er.target
            rut = form.rut.value
            nombre = form.nombre.value
            apellido = form.apellido.value
            telefono = form.telefono.value
            edificio = form.edificio.value
            departamento = form.departamento.value

            this.con.connect(function () {
                residente2.con.query("select * from residente where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Residente no encontrado',

                        })
                        console.log(result)
                    } else {
                        residente2.con.query("update residente set nombre=?,apellido=?,telefono=?,edificio=?,departamento=? where rut=?", [nombre, apellido, telefono, edificio, departamento, rut], function (error, result) {
                            form.rut.value = ""
                            form.nombre.value = ""
                            form.apellido.value = ""
                            form.telefono.value = ""
                            alert("editado")
                        })
                    }
                })
            })
        }
    },
    mounted: function () {
        this.cargarSelect()
        this.cargarSelect2()
    }

});