const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var usuario4 = new Vue({
    el: "#usuario4",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        est: "",
        tip: "",
        usuarios: [],
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
            this.con.connect(function () {
                usuario4.con.query("select * from usuario where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Usuario no encontrado',

                        })
                        let user = localStorage.user
                        console.log(user)
                    } else {
                        usuario4.usuarios=result

                    }
                })
            })
        }
    }

});
