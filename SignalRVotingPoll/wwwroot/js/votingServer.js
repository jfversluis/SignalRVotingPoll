"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/votingHub").build();

connection.on("UpdateVotes", function (voteData) {
    myChart.data.datasets[0].data[0] = voteData[0];
    myChart.data.datasets[0].data[1] = voteData[1];
    
    myChart.update();
});

document.getElementById("resetButton").addEventListener("click", function (event) {
    connection.invoke("DisableCheatMode").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

