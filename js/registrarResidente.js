const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var residente1 = new Vue({
    el: "#residente1",
    data: {
        window: remote.getCurrentWindow(),
        selected: '',
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
                residente1.con.query("select * from edificio", function (error, result) {
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
                residente1.con.query("select * from departamento where edificio=1", function (error, result) {
                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        option.value = dato.id
                        option.innerHTML = dato.numero
                        departamento.appendChild(option)
                    })
                })
            })
        },

        registrarResidente: function (rr) {
            rr.preventDefault()
            form = rr.target
            rut = form.rut.value
            nombre = form.nombre.value
            apellido = form.apellido.value
            telefono = form.telefono.value
            edificio = form.edificio.value
            departamento = form.departamento.value
            x = validaRut(rut)
            if (x == false) {
                Swal.fire(
                    'Error!',
                    'Revise Rut',
                    'error'
                )
            } else {
                this.con.connect(function () {
                    residente1.con.query("select * from residente where rut=?", [rut], function (error, result) {
                        if (result.length > 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Residente ya registrado',
                            })
                        } else {
                            residente1.con.query("insert into residente (rut,nombre,apellido,telefono,edificio,departamento) values(?,?,?,?,?,?)", [rut, nombre, apellido, telefono, edificio, departamento], function (error, result) {
                                form.rut.value = ""
                                form.nombre.value = ""
                                form.apellido.value = ""
                                form.telefono.value = ""
                                Swal.fire(
                                    'Listo!',
                                    'Residente registrado!',
                                    'success'
                                )

                            })
                        }
                    })


                })
            }


        },

        cambio: function () {
            var departamento = document.getElementById("departamento")
            departamento.innerHTML = ""
            this.con.connect(function () {
                residente1.con.query("select * from departamento where edificio=?", [residente1.selected], function (error, result) {

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