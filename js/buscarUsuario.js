const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var usuario3 = new Vue({
    el: "#usuario3",
    data: {
        window: remote.getCurrentWindow(),
        x:"",
        est:"",
        tip:"",
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    mounted:function(){

    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            rut = form.rut.value
            this.con.connect(function () {
                usuario3.con.query("select * from usuario where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        alert("error, usuario no encontrado")
                        let user=localStorage.user
                        console.log(user)   
                    } else {
                        result.forEach(function (element) {
                            usuario3.x=result[0]
                            if(usuario3.est=result[0].estado==0){
                                usuario3.est="Deshabilitado"
                            }else{
                                usuario3.est="Habilitado"
                            }
                            if(usuario3.tip=result[0].tipo==0){
                                usuario3.tip="Guardia"
                            }else{
                                usuario3.tip="Administrador"
                            }
                        })

                    }
                })
            })
        }
    }

});
