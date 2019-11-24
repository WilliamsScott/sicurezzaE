const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var residente2 = new Vue({
    el: "#residente2",
    data: {
        window: remote.getCurrentWindow(),
        selected: 1,
        dpe1: [],
        dpe2: [],
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
        arreglos: function () {
            this.con.connect(function () {
                residente2.con.query("select departamento.id, departamento.numero from departamento where edificio=1", [residente2.selected], function (error, result) {
                    residente2.dpe1 = result
                })
                residente2.con.query("select departamento.id, departamento.numero from departamento where edificio=2", [residente2.selected], function (error, result) {
                    residente2.dpe2 = result
                })
            })
        },
        cargarSelect3: function (dt) {
            var edi = dt
            var departamento = document.getElementById("departamento")
            var edificio = document.getElementById("edificio")
            var e = edificio.value
            console.log(e)
            this.con.connect(function () {
                residente2.con.query("select * from departamento where edificio=?", [edi], function (error, result) {
                    departamento.innerHTML = ""
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
            x = validaRut(rut)
            if (x == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    residente2.con.query("select * from residente where rut=?", [x], function (error, result) {
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
                            if (result[0].edificio != 1) {
                                console.log("ed " + result[0].edificio)
                                residente2.cargarSelect3(result[0].edificio)
                                departamento.value = result[0].departamento
                            }
                            residente2.selected = result[0].edificio
                            nombre.value = result[0].nombre
                            apellido.value = result[0].apellido
                            telefono.value = result[0].telefono
                            edificio.value = result[0].edificio
                            departamento.value = result[0].departamento

                        }
                    })
                })
            }
        },
        editarResidente: function (er) {
            er.preventDefault()
            rut = document.getElementById("rut").value
            nombre = document.getElementById("nombre").value
            apellido = document.getElementById("apellido").value
            telefono = document.getElementById("telefono").value
            edificio = document.getElementById("edificio").value
            departamento = document.getElementById("departamento").value
            x = validaRut(rut)
            if (x == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    residente2.con.query("select * from residente where rut=?", [x], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Residente no encontrado',
                            })
                        } else {
                            residente2.con.query("update residente set nombre=?,apellido=?,telefono=?,edificio=?,departamento=? where rut=?", [nombre, apellido, telefono, edificio, departamento, x], function (error, result) {
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
            }
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
        onlyNumber: function (e) {
            if (!/\d/.test(e.key) && e.keyCode != 8 && e.keyCode != 13 && e.keyCode != 9) {
                e.preventDefault();
            }
        }

    },
    mounted: function () {
        this.cargarSelect()
        this.cargarSelect2()
        this.arreglos()
    }

});