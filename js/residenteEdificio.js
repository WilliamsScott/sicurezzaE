const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var informer1 = new Vue({
    el: "#informer1",
    data: {
        window: remote.getCurrentWindow(),
        arreglo: [],
        arreglo2: [],
        arregloExcel1:[],
        arregloExcel2:[],
        con: remote.getGlobal("con")
    },
    methods: {
        cargarGrafico: function () {
            this.con.connect(function () {
                informer1.con.query("select * from edificio", function (error, result) {
                    result.forEach(function (dato) {
                        informer1.con.query("select count(*) as total, edificio.nombre from residente join edificio on residente.edificio=edificio.id where edificio=?", [dato.id], function (error, result) {
                            result.forEach(function (e) {
                                informer1.arreglo.push(e.total)
                                informer1.arreglo2.push(e.nombre)
                            })
                        })
                    })
                })
            })
        },
        residentesxEdificio: function () {
            this.con.connect(function () {
                informer1.con.query("select * from edificio", function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Error',

                        })
                    } else {
                        result.forEach(function (element) {
                            
                            informer1.con.query("select count(*) as total,edificio.nombre as edificio from residente join edificio on residente.edificio=edificio.id where edificio=1", function (error, result) {
                                result.forEach(function () {
                                    informer1.arregloExcel1=result
                                })
                            })
                            informer1.con.query("select count(*) as total,edificio.nombre as edificio from residente join edificio on residente.edificio=edificio.id where edificio=2", function (error, result) {
                                result.forEach(function () {
                                    informer1.arregloExcel2=result
                                })
                            })
                        })

                    }
                })
            })
        },
    },
    mounted: function () {
        this.cargarGrafico()
        this.residentesxEdificio()
    }
});