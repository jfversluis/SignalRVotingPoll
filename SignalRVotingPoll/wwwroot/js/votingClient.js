"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/votingHub").build();

document.getElementById("awesomeButton").addEventListener("click", function (event) {
    connection.invoke("SendVote", 0).catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("statusLabel").innerText = "👍 Thanks for your vote, voting is now disabled.";
    document.getElementById("mehButton").disabled = true;
    document.getElementById("awesomeButton").disabled = true;

    event.preventDefault();
});

connection.on("Reset", function () {
    document.getElementById("statusLabel").innerText = "🔄 Voting has been reset! Happy voting!";
    document.getElementById("mehButton").disabled = false;
    document.getElementById("awesomeButton").disabled = false;
});

document.getElementById("mehButton").addEventListener("click", function (event) {
    connection.invoke("SendVote", 1).catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("statusLabel").innerText = "👍 Thanks for your vote, voting is now disabled.";
    document.getElementById("mehButton").disabled = true;
    document.getElementById("awesomeButton").disabled = true;

    event.preventDefault();
});

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

