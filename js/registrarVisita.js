const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")


var visita1 = new Vue({
    el: "#visita1",
    data: {
        window: remote.getCurrentWindow(),
        texto: "",
        tipo: "",
        selected: '',
        isDisabled: true,
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
                visita1.con.query("select * from edificio", function (error, result) {
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
                visita1.con.query("select * from departamento where edificio=1", function (error, result) {
                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        option.value = dato.id
                        option.innerHTML = dato.numero
                        departamento.appendChild(option)
                    })
                })
            })
        },
        cargarSelectV: function () {
            var estacionamiento = document.getElementById("estacionamiento")
            this.con.connect(function () {
                visita1.con.query("select * from estacionamientovisita where estado=0", function (error, result) {
                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        if (dato.estado == 0) {
                            option.value = dato.numero
                            option.innerHTML = dato.numero
                            estacionamiento.appendChild(option)
                        }
                    })
                })
            })
        },
        registrarVisita: function (rv) {
            rv.preventDefault()
            form = rv.target
            rut = form.rut.value
            nombre = form.nombre.value
            apellido = form.apellido.value
            telefono = form.telefono.value
            edificio = form.edificio.value
            departamento = form.departamento.value
            patente = form.patente.value
            let user = localStorage.user
            x = validaRut(rut)
            if (x == false) {
                Swal.fire(
                    'Error!',
                    'Revise Rut',
                    'error'
                )
            }
            else {
                if (patente == "") {
                    var rut2 = x
                    this.con.connect(function () {
                        visita1.con.query("insert into visita (rut,nombre,apellido,telefono,edificio,departamento,usuario) values(?,?,?,?,?,?,?)", [rut2, nombre, apellido, telefono, edificio, departamento, user], function (error, result) {
                            form.rut.value = ""
                            form.nombre.value = ""
                            form.apellido.value = ""
                            form.telefono.value = ""
                            Swal.fire(
                                'Listo!',
                                'Visita Registrada Con Éxito!',
                                'success'
                            )
                        })

                    })
                } else {
                    this.con.connect(function () {
                        if (form.patente.value != "") {
                            patente = form.patente.value
                            var expReg = /^([A-Za-z]{2,4}\d{2,4})$/
                            if (expReg.test(patente)) {
                                var rut2 = x
                                visita1.con.query("insert into visita (rut,nombre,apellido,telefono,edificio,departamento,usuario) values(?,?,?,?,?,?,?)", [rut2, nombre, apellido, telefono, edificio, departamento, user], function (error, result) {
                                    form.rut.value = ""
                                    form.nombre.value = ""
                                    form.apellido.value = ""
                                    form.telefono.value = ""

                                })
                                marca = form.marca.value
                                modelo = form.modelo.value
                                estacionamiento = form.estacionamiento.value
                                visita1.con.query("select max(id) as idv from visita", function (error, result) {
                                    result.forEach(function () {
                                        var idv = result[0].idv
                                        visita1.con.query("insert into vehiculovisita (patente,marca,modelo,numeroEstacionamiento,visita) values(?,?,?,?,?)", [patente, marca, modelo, estacionamiento, idv], function (error, result) {
                                            form.patente.value = ""
                                            form.marca.value = ""
                                            form.modelo.value = ""
                                            Swal.fire(
                                                'Listo!',
                                                'Visita y Vehiculo Registrados Con Éxito!',
                                                'success'
                                            )
                                        })
                                    })
                                })
                            } else {
                                Swal.fire(
                                    'Error!',
                                    'Revise Patente',
                                    'error'
                                )
                            }


                        }
                    })
                }
            }

        },
        cambio: function () {
            var departamento = document.getElementById("departamento")
            departamento.innerHTML = ""
            this.con.connect(function () {
                visita1.con.query("select * from departamento where edificio=?", [visita1.selected], function (error, result) {

                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        option.value = dato.id
                        option.innerHTML = dato.numero
                        departamento.appendChild(option)
                    })
                })
            })
        },
        tipoUser: function () {
            let tipo = localStorage.tipoUser
            this.tipo = tipo
            console.log(tipo)
        },
        vehiculo: function () {
            document.getElementById("vh").style.display = "block"
            document.getElementById("patente").disabled = false
            document.getElementById("marca").disabled = false
            document.getElementById("modelo").disabled = false
            document.getElementById("estacionamiento").disabled = false
        },
        vehiculo2: function () {
            document.getElementById("vh").style.display = "none"
            document.getElementById("patente").disabled = true
            document.getElementById("marca").disabled = true
            document.getElementById("modelo").disabled = true
            document.getElementById("estacionamiento").disabled = true

        }




    },
    mounted: function () {
        this.cargarSelect()
        this.cargarSelect2()
        this.cargarSelectV()
        this.tipoUser()
        

    }
});