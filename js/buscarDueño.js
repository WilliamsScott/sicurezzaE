const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var dueño3 = new Vue({
    el: "#dueño3",
    data: {
        window: remote.getCurrentWindow(),
        dueños: [],
        depa: "",
        selected:1,
        con: remote.getGlobal("con")
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
            var edificio = document.getElementById("edificio")
            var e = edificio.value
            this.con.connect(function () {
                dueño3.con.query("select * from departamento where edificio=1", function (error, result) {
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
                        result.forEach(function () {
                            dueño3.dueños = result
                            dueño3.depa=departamento
                        })
                        //document.getElementById("edificio").innerHTML=""
                        //dueño3.cargarSelect()
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
        },
        cambio: function () {
            var departamento = document.getElementById("departamento")
            departamento.innerHTML = ""
            this.con.connect(function () {
                dueño3.con.query("select * from departamento where edificio=?", [dueño3.selected], function (error, result) {
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