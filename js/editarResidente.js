const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var residente2 = new Vue({
    el: "#residente2",
    data: {
        window: remote.getCurrentWindow(),
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
            var edificio = document.getElementById("edificio")
            var e = edificio.value
            console.log(e)
            this.con.connect(function () {
                residente2.con.query("select * from departamento where edificio=1", function (error, result) {
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
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre")
            apellido = document.getElementById("apellido")
            telefono = document.getElementById("telefono")
            edificio = document.getElementById("edificio")
            departamento = document.getElementById("departamento")
            this.con.connect(function () {
                residente2.con.query("select * from residente where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Residente no encontrado',
                        })
                        nombre.value = ""
                        apellido.value = ""
                        telefono.value = ""
                        console.log(result)
                    } else {
                        result.forEach(function (element) {
                            console.log(result[0].nombre)
                            nombre.value = result[0].nombre
                            apellido.value = result[0].apellido
                            telefono.value = result[0].telefono
                            edificio.value = result[0].edificio
                            departamento.value = result[0].departamento
                        })

                    }
                })
            })
        },
        editarResidente: function (er) {
            er.preventDefault()
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre").value
            apellido = document.getElementById("apellido").value
            telefono = document.getElementById("telefono").value
            edificio = document.getElementById("edificio").value
            departamento = document.getElementById("departamento").value
            this.con.connect(function () {
                residente2.con.query("select * from residente where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Residente no encontrado',
                        })
                    } else {
                        residente2.con.query("update residente set nombre=?,apellido=?,telefono=?,edificio=?,departamento=? where rut=?", [nombre, apellido, telefono, edificio, departamento, rut], function (error, result) {
                            Swal.fire(
                                'Listo!',
                                'Residente editado!',
                                'success'
                            )
                            document.getElementById("rut").value = ""
                            document.getElementById("nombre").value = ""
                            document.getElementById("apellido").value = ""
                            document.getElementById("telefono").value = ""
                        })
                    }
                })
            })
        },
        cambio: function () {
            var departamento = document.getElementById("departamento")
            departamento.innerHTML = ""
            this.con.connect(function () {
                residente2.con.query("select * from departamento where edificio=?", [residente2.selected], function (error, result) {

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