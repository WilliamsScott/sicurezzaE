const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var vehiculo1 = new Vue({
    el: "#vehiculo1",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        vehiculo:[],
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
            buscarpor = form.buscarpor.value
            this.con.connect(function () {
                vehiculo1.con.query("select * from vehiculoresidente where patente=?", [buscarpor], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Usuario no encontrado',

                        })
                        console.log(buscarpor)
                    } else {
                        vehiculo1.vehiculo=result
                    }
                })
            })
        }
    }

});
