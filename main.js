/*
    Author: Andre
    JavaScript for the spaceship website
    API ref: https://lldev.thespacedevs.com/2.2.0/config/spacecraft/
*/

// Variables
const shipDataUrl = "https://lldev.thespacedevs.com/2.2.0/config/spacecraft/?in_use=true&human_rated=true&order=name";
const shipList = document.getElementById("ship-list");
const shipImage = document.getElementById("ship-image");
const shipInfo = document.getElementById("ship-info");

// When the page load
window.addEventListener("load", updateShipList);

// Retreive the spaceships data
async function getShipData(){
    return fetch(shipDataUrl).then(response => response.json());
}

// Add spaceships to drop down list
function updateShipList(){
    getShipData().then(function(data){
            for(element in data.results){
                let option = createOption(data.results[element].name);
                shipList.appendChild(option);
            }
        }
    );
}

function createOption(text){
    let option = document.createElement("option");
    option.textContent = text;
    console.log(option.text);
    return option;
}
