const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var visita2 = new Vue({
    el: "#visita2",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        est: "",
        tip: "",
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    mounted: function () {

    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            rut = form.rut.value
            fecha1 = form.fecha1.value
            fecha2 = form.fecha2.value
            buscarpor = form.buscarpor.value
            var tabla = document.getElementById("tbody")
            this.con.connect(function () {
                if (buscarpor == "rut") {

                    visita2.con.query("SELECT visita.rut,visita.nombre,visita.apellido,visita.telefono, visita.usuario, vehiculovisita.patente, edificio.nombre as edificio, departamento.numero as departamento from visita left join vehiculovisita on visita.id=vehiculovisita.visita join edificio on edificio.id=visita.edificio join departamento on visita.departamento=departamento.id where rut=?", [rut], function (error, result) {
                        if (result.length == 0) {
                            alert("error, usuario no encontrado")
                            let user = localStorage.user
                            console.log(user)
                        } else {
                            result.forEach(function (element) {
                                // visita2.x = result[0]
                                var tr = document.createElement("tr")
                                var td = document.createElement("td")
                                var td2 = document.createElement("td")
                                var td3 = document.createElement("td")
                                var td4 = document.createElement("td")
                                var td5 = document.createElement("td")
                                var td6 = document.createElement("td")
                                var td7 = document.createElement("td")
                                var td8 = document.createElement("td")
                                var rut = document.createTextNode(element.rut)
                                var nombre = document.createTextNode(element.nombre)
                                var apellido = document.createTextNode(element.apellido)
                                var telefono = document.createTextNode(element.telefono)
                                var patente = document.createTextNode(element.patente)
                                var edificio = document.createTextNode(element.edificio)
                                var departamento = document.createTextNode(element.departamento)
                                var usuario = document.createTextNode(element.usuario)

                                td.appendChild(rut)
                                tr.appendChild(td)
                                tabla.appendChild(tr)

                                td2.appendChild(nombre)
                                tr.appendChild(td2)
                                tabla.appendChild(tr)

                                td3.appendChild(apellido)
                                tr.appendChild(td3)
                                tabla.appendChild(tr)

                                td4.appendChild(telefono)
                                tr.appendChild(td4)
                                tabla.appendChild(tr)

                                var patentex = element.patente
                                if (patentex == null) {
                                    var patente = document.createTextNode("No")
                                    td5.appendChild(patente)
                                    tr.appendChild(td5)
                                    tabla.appendChild(tr)
                                } else {
                                    var patente = document.createTextNode(element.patente)
                                    td5.appendChild(patente)
                                    tr.appendChild(td5)
                                    tabla.appendChild(tr)
                                }

                                td6.appendChild(edificio)
                                tr.appendChild(td6)
                                tabla.appendChild(tr)

                                td7.appendChild(departamento)
                                tr.appendChild(td7)
                                tabla.appendChild(tr)

                                td8.appendChild(usuario)
                                tr.appendChild(td8)
                                tabla.appendChild(tr)


                            })

                        }
                    })
                } else {
                    visita2.con.query("SELECT visita.rut,visita.nombre,visita.apellido,visita.telefono, visita.usuario, vehiculovisita.patente, edificio.nombre as edificio, departamento.numero as departamento from visita left join vehiculovisita on visita.id=vehiculovisita.visita join edificio on edificio.id=visita.edificio join departamento on visita.departamento=departamento.id where visita.fecha between ? and ?", [fecha1,fecha2], function (error, result) {
                        if (result.length == 0) {
                            alert("error, usuario no encontrado")
                            let user = localStorage.user
                            console.log(user)
                        } else {
                            result.forEach(function (element) {
                                // visita2.x = result[0]
                                var tr = document.createElement("tr")
                                var td = document.createElement("td")
                                var td2 = document.createElement("td")
                                var td3 = document.createElement("td")
                                var td4 = document.createElement("td")
                                var td5 = document.createElement("td")
                                var td6 = document.createElement("td")
                                var td7 = document.createElement("td")
                                var td8 = document.createElement("td")
                                var rut = document.createTextNode(element.rut)
                                var nombre = document.createTextNode(element.nombre)
                                var apellido = document.createTextNode(element.apellido)
                                var telefono = document.createTextNode(element.telefono)
                                var patente = document.createTextNode(element.patente)
                                var edificio = document.createTextNode(element.edificio)
                                var departamento = document.createTextNode(element.departamento)
                                var usuario = document.createTextNode(element.usuario)

                                td.appendChild(rut)
                                tr.appendChild(td)
                                tabla.appendChild(tr)

                                td2.appendChild(nombre)
                                tr.appendChild(td2)
                                tabla.appendChild(tr)

                                td3.appendChild(apellido)
                                tr.appendChild(td3)
                                tabla.appendChild(tr)

                                td4.appendChild(telefono)
                                tr.appendChild(td4)
                                tabla.appendChild(tr)

                                var patentex = element.patente
                                if (patentex == null) {
                                    var patente = document.createTextNode("No")
                                    td5.appendChild(patente)
                                    tr.appendChild(td5)
                                    tabla.appendChild(tr)
                                } else {
                                    var patente = document.createTextNode(element.patente)
                                    td5.appendChild(patente)
                                    tr.appendChild(td5)
                                    tabla.appendChild(tr)
                                }

                                td6.appendChild(edificio)
                                tr.appendChild(td6)
                                tabla.appendChild(tr)

                                td7.appendChild(departamento)
                                tr.appendChild(td7)
                                tabla.appendChild(tr)

                                td8.appendChild(usuario)
                                tr.appendChild(td8)
                                tabla.appendChild(tr)


                            })

                        }
                    })
                }
            })
        }
    }

});
