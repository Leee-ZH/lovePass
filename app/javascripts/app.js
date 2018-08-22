// import "../stylesheets/app.css";
import {  default as Web3 } from 'web3';
import {  default as contract } from 'truffle-contract';
import Migrations_artifacts from '../../build/contracts/Migrations.json'

var accounts, sim;
var Migrations = contract(Migrations_artifacts);

function strToHexCharCode(str) {
　　if(str === "")
　　　　return "";
　　var hexCharCode = [];
　　hexCharCode.push("0x");
　　for(var i = 0; i < str.length; i++) {
　　　　hexCharCode.push((str.charCodeAt(i)).toString(16));
　　}
　　return hexCharCode.join("");
}

window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    Migrations.setProvider(web3.currentProvider);
    App.start();

    $("#showNgoList").click(function() {
        App.reNgoList();
        App.updateShow();
    });

    $("#createNgo").click(function(){
        App.crNgo(String($("#NgoNa").val()), $("#NgoPa").val(), " ", $("#NgoAd").val());
    });

});

window.App = {
    start: function() {
        var self = this;
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                console.log(err);
                return;
            }
            if (accs.length == 0) {
              return;
            }
            accounts = accs;
            console.log(accounts);
            self.initializeLovePass();
        });
    },

    initializeLovePass: function() {
        var self = this;
        Migrations.deployed().then(function(instance) {
            sim = instance;
            $("#confAddress").html(sim.address);
        }).catch(function(e) {
            console.log(e);
        });
    },

    reNgoList: function() {
        Migrations.deployed().then(function(instance) {
            sim.reNgoList().then(
            function() {
                console.log(sim.reNgoList.call());
                return sim.reNgoList.call();
            });
        });
    },

    crNgo: function(nam, pass, intr, ad) {
        web3.eth.defaultAccount = web3.eth.accounts[0];
        Migrations.deployed().then(function(instance) {
            instance.crNgo(nam, pass, intr, ad, {gas:3141592}).then(
                function() {
                    return sim.crNgo.sendTransaction(nam, pass, intr, ad);
                }).catch(function(e){
                    console.log(e);
                }
            );
        });
    },

    updateShow: function() {
        var self = this;
        Migrations.deployed().then(function(instance) {
            sim = instance;
            $("#NgoInf").innerHTML = sim.reNgoList();
        }).catch(function(e) {
            console.log(e);
        });
    }

};//loop for main
