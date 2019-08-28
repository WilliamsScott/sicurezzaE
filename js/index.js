const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

setInterval(() => {
    var iframe = document.getElementById("frame")
    iframe.src = iframe.src
}, 500)

var primero = new Vue({
    el: "#primero",
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
        },
        iniciarSesion: function (login) {
            login.preventDefault() //EL SUBMIT POR DEFECTO HACE QUE SE RECARGUE LA PAG Y CON EL PREVENTDEFAULT NO PASA ESA WEA.
            form = login.target//AL RECIBIR EL EVENTO EL TARGET ES EL FORMULARIO.
            usuario = form.user.value
            clave = form.clave.value
            console.log(clave)
            this.con.connect(function () {
                primero.con.query("select * from usuario where rut=? and clave =md5(?)", [usuario, clave], function (error, result) {
                    if (result.length > 0) {
                        primero.window.loadURL("file://" + __dirname + "/menuPrincipal.html")
                        
                    }
                    result.forEach(function(dato){
                        localStorage.user=dato.rut
                        localStorage.bienvenido=(dato.nombre+" "+dato.apellido)
                        console.log(bienvenido)
                    })

                })
            })
        },
        limpiar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            form.user.value = ""
            form.clave.value = ""
            //console.log(form)
        },
        nueva: function () {
            var nueva = new BrowserWindow({
                webPreferences: { nodeIntegration: true },
            })

            nueva.loadURL("file://" + __dirname + "/registrarVisita.html")
        },
        carga: function () {
            setInterval("carga()", 5);
            location.reload()
        },
        startInterval: function () {
            setInterval(() => {
                this.frame = frame + 1
            }, 100);


        }
    }

});



