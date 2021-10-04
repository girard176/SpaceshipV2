/*
    Author: Andre
    JavaScript for the spaceship website
    API ref: https://lldev.thespacedevs.com/2.2.0/config/spacecraft/
*/

// Variables
const shipDataUrl = "https://lldev.thespacedevs.com/2.2.0/config/spacecraft/?in_use=true&human_rated=true&order=name";
const shipList = document.getElementById("ship-list");

const shipResult = document.getElementById("ship-result")
const shipImage = document.getElementById("ship-image")
const shipAgency = document.getElementById("ship-agency")
const shipName = document.getElementById("ship-name")
const shipCapability = document.getElementById("ship-capability")
const shipMaidenFlight = document.getElementById("ship-maidenflight")
const shipCrewCapacity = document.getElementById("ship-crewcapacity")
const shipWiki = document.getElementById("ship-wiki")

var shipWikiUrl

// When the page load
window.addEventListener("load", updateShipList);

// Retreive the spaceships data
async function getShipData(){
    return fetch(shipDataUrl).
        then(response => response.json());
}

// Add spaceships to drop down list
function updateShipList(){
    getShipData().then(function(data){
            console.log("Updated ship list: ")
            for(element in data.results){
                let option = createOption(data.results[element].id, data.results[element].name);
                shipList.appendChild(option);
            }
        }
    );
}

function createOption(id, text){
    let option = document.createElement("option");
    option.id = id;
    option.textContent = text;
    console.log(option.text);
    return option;
}

// When a spaceship is selected from the list
shipList.addEventListener("change", function(){
    let id = this.options[this.selectedIndex].id;
    console.log("Selection made: " + this.value + " id: " + id)
    selectShipData(id);
    displayResult();
});

// Retrieve spaceship data
function selectShipData(id) {
	fetch(`https://lldev.thespacedevs.com/2.2.0/config/spacecraft/${id}`)
		.then(response => response.json())
		.then(data => {
			shipImage.innerHTML = `<img src=${data.image_url} alt="Ship"/>`;
            shipAgency.textContent = `Agency: ${data.agency.name}`;
            shipName.textContent = `Name: ${data.name}`;
            shipCapability.textContent = `Capability: ${data.capability}`;
            shipMaidenFlight.textContent = `Maiden flight: ${data.maiden_flight}`;
            shipCrewCapacity.textContent = `Crew capacity: ${data.crew_capacity}`;
            shipWikiUrl = data.wiki_link;
		});
}

// Show the ship-result panel
function displayResult() {
    shipResult.style.display = "flex";
  }

// When the Wiki button is clicked
shipWiki.addEventListener("click", function(){
    console.log("Button clicked, ship URL: " + shipWikiUrl);
    window.open(shipWikiUrl, '_blank').focus();
});