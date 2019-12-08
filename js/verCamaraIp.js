const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")


var camaraIp = new Vue({
    el: "#camaraIp",
    data: {
        window: remote.getCurrentWindow(),
        con: remote.getGlobal("con"),
    },
    methods: {
        carga: function () {
            setInterval("carga()", 5);
            location.reload()
        },
        cerrarVentana: function () {
            this.window.close()
        },
        minimizarVentana: function () {
            this.window.minimize()
        },
        maximizarVentana: function () {
            this.window.maximize()
        },

    }

});



