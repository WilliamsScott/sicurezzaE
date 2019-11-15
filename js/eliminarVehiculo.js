const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var vehiculo3 = new Vue({
    el: "#vehiculo3",
    data: {
        window: remote.getCurrentWindow(),
        x: "",
        vehiculo: [],
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    methods: {
        buscar: function (e) {
            e.preventDefault()
            rut=document.getElementById("rut").value
            this.con.connect(function () {
                vehiculo3.con.query("select * from vehiculoresidente where residente=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: "Ningun vehiculo encontrado para ese RUT",
                        })
                    } else {
                        vehiculo3.vehiculo = result
                    }
                })
            })
        },
        eliminarVehiculo:function(patente){
            this.con.connect(function(){
                try{
                    vehiculo3.con.query("delete from vehiculoresidente where patente=?",[patente],function(error,result){
                        Swal.fire({
                            type: 'success',
                            title: 'Listo!',
                            text: 'Vehiculo Eliminado',
                        })
                    })
                    vehiculo3.vehiculo=[]
                    document.getElementById("rut").value=""

                }catch{
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'No se pudo eliminar',

                    })
                }
                
            })
        }
    }

});
