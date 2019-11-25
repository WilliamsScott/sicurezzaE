const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var dueño5 = new Vue({
    el: "#dueño5",
    data: {
        window: remote.getCurrentWindow(),
        dueño: [],
        dueñoNuevo: [],
        selected: "1",
        con: remote.getGlobal("con")
    },
    methods: {
        cargarSelect: function () {
            var edificio = document.getElementById("edificio")
            this.con.connect(function () {
                dueño5.con.query("select * from edificio", function (error, result) {
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
                dueño5.con.query("select * from departamento where edificio=1", function (error, result) {
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
                dueño5.con.query("select departamento.dueño,dueño.* from departamento join dueño on departamento.dueño=dueño.rut where departamento.id=?", [departamento], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Dueño no encontrado',
                        })
                    } else {
                        result.forEach(function (element) {
                            dueño5.dueño = result
                        })

                    }
                })
            })
        },
        buscar2: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            x = validaRut(rut)
            if (x == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    dueño5.con.query("select * from dueño where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Dueño no encontrado',
                            })
                        } else {
                            result.forEach(function (element) {
                                dueño5.dueñoNuevo = result
                            })

                        }
                    })
                })
            }
        },
        asignarDueño: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            edificio = form.edificio.value
            departamento = form.departamento.value
            x = validaRut(rut)
            if (x == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    dueño5.con.query("select * from dueño where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Dueño no encontrado',
                            })
                        } else {
                            dueño5.con.query("update departamento set dueño=? where id=?", [rut, departamento], function (error, result) {
                                form.rut.value = ""
                                Swal.fire({
                                    type: 'success',
                                    title: 'Listo!',
                                    text: 'Dueño asignado!',
                                })
                                dueño5.dueñoNuevo = []
                                dueño5.dueño = []
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
                dueño5.con.query("select * from departamento where edificio=?", [dueño5.selected], function (error, result) {
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