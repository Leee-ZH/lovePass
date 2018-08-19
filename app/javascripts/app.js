// import "../stylesheets/app.css";
import {  default as Web3 } from 'web3';
import {  default as contract } from 'truffle-contract';
import Migrations_artifacts from '../../build/contracts/Migrations.json'

var accounts, sim;
var Migrations = contract(Migrations_artifacts);

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

    reNgoList: function(){
        Migrations.deployed().then(function(instance) {
            sim = instance;
            console.log(sim);
            sim.reNgoList().then(
            function() {
                console.log(sim.reNgoList.call());
                return sim.reNgoList.call();
            });
        });
    }

};//loop for main
