const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var residente3 = new Vue({
    el: "#residente3",
    data: {
        window: remote.getCurrentWindow(),
        residentes: [],
        rutR: "",
        con: remote.getGlobal("con")
    },
    methods: {
        //BUSCAR CON EL PRIMER IF DE VALIDAR EL RUT SE DEBE UTILIZAR LA VARIABLE QUE SE DECLARE AL VALIDAR PARA REALIZAR LA CONSULTA//
        buscar: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut").value
            x = validaRut(rut)
            if (x == false) {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
                residente3.residentes = []
                residente3.rutR = ""
            } else {
                this.con.connect(function () {
                    residente3.con.query("SELECT residente.rut, residente.nombre,residente.apellido,residente.telefono,edificio.nombre as edificio,departamento.numero as departamento from residente join edificio on residente.edificio=edificio.id join departamento on residente.departamento=departamento.id where rut=?", [x], function (error, result) {
                        if (result.length == 0) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'Residente no encontrado',

                            })
                        } else {
                            residente3.residentes = result
                            residente3.rutR = result[0].rut
                        }
                    })
                })
            }
        },
        eliminar: function (e) {
            e.preventDefault()
            rut = document.getElementById("rut")
            this.con.connect(function () {
                try {
                    residente3.con.query("DELETE from vehiculoresidente where residente=?", [residente3.rutR], function (error, result) {
                        residente3.con.query("update estacionamientoresidente set residente=null where residente=?", [residente3.rutR], function (error, result) {
                            residente3.con.query("DELETE from residente where rut=?", [residente3.rutR], function (error, result) {
                                Swal.fire({
                                    type: 'success',
                                    title: 'Listo!',
                                    text: 'Residente eliminado!',
                                })
                                residente3.residentes = []
                                document.getElementById("rut").value = ""
                            })
                        })
                    })

                } catch (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'No se pudo eliminar residente',

                    })
                }
            })

        }
    }

});
