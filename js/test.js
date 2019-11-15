const remote = require("electron").remote;
const BrowserWindow= remote.BrowserWindow
const mysql = require("mysql")

var test = new Vue({
    el: "#test",
    data: {
        window: remote.getCurrentWindow()
    },
    methods: {
        x: function () {
            this.window.minimize()
        },
        caca:function(){
            console.log("wea")
        }
    }
});