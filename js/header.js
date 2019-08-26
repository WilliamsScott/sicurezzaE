const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var header = new Vue({
    el: "#header",
    data: {
        window: remote.getCurrentWindow(),
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),

    },
    methods: {
        cerrarVentana: function () {
            this.window.close()
        },
        minimizarVentana: function () {
            this.window.minimize()
        },
        maximizarVentana: function () {
            this.window.maximize()
        }
    }

});



