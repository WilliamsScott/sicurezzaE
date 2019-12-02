const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")


var primero = new Vue({
    el: "#primero",
    data: {
        window: remote.getCurrentWindow(),
        con: remote.getGlobal("con")

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
            login.preventDefault()
            form = login.target
            usuario = form.user.value
            clave = form.clave.value
            x = validaRut(usuario)
            if (x == false && usuario != 'admin') {
                Swal.fire({
                    type: 'error',
                    title: 'Error...',
                    text: 'Revise RUT',
                })
            } else {
                this.con.connect(function () {
                    primero.con.query("select * from usuario where rut=? and clave=aes_encrypt(?,'williams')", [usuario, clave], function (error, result) {
                        if (result.length > 0) {
                            if (result[0].estado == 1) {
                                if (result[0].tipo == 1) {
                                    localStorage.user = result[0].rut
                                    localStorage.tipoUser = result[0].tipo
                                    localStorage.bienvenido = (result[0].nombre + " " + result[0].apellido)
                                    primero.window.loadURL("file://" + __dirname + "/menuPrincipal.html")

                                } else {
                                    localStorage.user = result[0].rut
                                    localStorage.tipoUser = result[0].tipo
                                    localStorage.bienvenido = (result[0].nombre + " " + result[0].apellido)
                                    primero.window.loadURL("file://" + __dirname + "/menuPrincipalGuardia.html")
                                }
                            } else {
                                Swal.fire({
                                    type: 'error',
                                    title: 'Error...',
                                    text: 'Usuario deshabilitado',
                                })
                            }
                        } else {
                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'RUT o clave incorrectos',
                            })
                        }

                    })
                })
            }

        },
        limpiar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            form.user.value = ""
            form.clave.value = ""
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



