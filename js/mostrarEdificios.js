const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var edificio1 = new Vue({
    el: "#edificio1",
    data: {
        window: remote.getCurrentWindow(),
        edificios: [],
        res: [],
        dep: [],
        con: remote.getGlobal("con")
    },
    methods: {
        cargarEdificios() {
            this.con.connect(function () {
                edificio1.con.query("select * from edificio", function (error, result) {
                    result.forEach(function (element) {
                        edificio1.edificios = result
                        //edificio1.con.query("select count(*) from residente where edificio=? union select count(*) as d from departamento where edificio=?", [element.id, element.id], function (error, result) {
                        //  edificio1.res = result[0]
                        //edificio1.dep = result[1]

                        edificio1.con.query("select count(*) as r from residente where edificio=?", [element.id], function (error, result) {
                            result.forEach(function () {
                                edificio1.res = result
                               
                            })

                        })
                        edificio1.con.query("select count(*) as d from departamento where edificio=?", [element.id], function (error, result) {
                            edificio1.dep = result
                        })
                    })
                })

            })
        }

    },
    mounted: function () {
        this.cargarEdificios()
    }

});